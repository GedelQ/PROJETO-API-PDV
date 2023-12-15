const orderService = require("../services/orderService")
const knex = require("../database/connection")
const { log } = require("console")
const send = require("../services/nodemailer")


const listOrders = async (req, res) => {
    try {
        const { cliente_id } = req.query

        const orders = await findByClient(cliente_id)

        if (orders.length === 0) {
            throw ({ message: "Invalid" })
        }

        return res.status(200).json(orders)
    } catch (error) {
        if (
            error.message.toLowerCase().includes(`inválida`) || error.message.toLowerCase().includes(`invalid`)
        ) {
            return res.status(400).json({
                message:
                    "Cliente_id inválido. Por favor verifique se esta inserindo apenas números e se o Cliente solicitado existe."
            })
        }

        return res.status(500).json({ message: "Erro interno do servidor." })
    }
}

const orders = async (req, res) => {
    const { cliente_id, pedido_produtos, observacao } = req.body
    const to = req.user.email
    const productsToCheck = { produtos: [] };
    const stock = { stockProducts: [] }
    let totalAmount = 0;

    try {
        const customerExist = await knex("clientes").where({ id: cliente_id })

        if (customerExist.length === 0) {
            return res.status(404).json({ message: "Esse cliente não existe." })
        }

        for (let item of pedido_produtos) {
            const productId = item.produto_id;

            const existingProductIndex = productsToCheck.produtos.findIndex(p => p.produto_id === productId);

            if (existingProductIndex === -1) {
                productsToCheck.produtos.push({
                    produto_id: productId,
                    quantidade_produto: item.quantidade_produto,
                    valor_produto: item.valor_produto * item.quantidade_produto
                });
            } else {
                productsToCheck.produtos[existingProductIndex].quantidade_produto += item.quantidade_produto;
                productsToCheck.produtos[existingProductIndex].valor_produto += item.valor_produto * item.quantidade_produto;
            }

            totalAmount += item.valor_produto * item.quantidade_produto;
        }

        for (let product of productsToCheck.produtos) {

            const productExist = await knex("produtos").where({ id: product.produto_id });
            // console.log(productExist);

            stock.stockProducts.push({
                stock: productExist[0].quantidade_estoque
            })

            if (productExist.length === 0) {
                return res.status(404).json({ messagem: `O produto com id ${product.produto_id} não existe` })
            }

            if (productExist[0].quantidade_estoque < product.quantidade_produto) {
                return res.status(400).json({
                    mensagem: `Para o produto id ${product.produto_id}, temos apenas ${productExist[0].quantidade_estoque} em estoque`
                })
            }
        }

        const pedidos = await knex("pedidos")
            .insert({
                cliente_id,
                observacao,
                valor_total: totalAmount
            }).returning(["id"])

        const pedidoId = pedidos[0];

        for (let i = 0; i < productsToCheck.produtos.length; i++) {

            await knex("produtos").update({
                quantidade_estoque: stock.stockProducts[i].stock - productsToCheck.produtos[i].quantidade_produto
            }).where({ id: productsToCheck.produtos[i].produto_id })

            //console.log("Pedido: ", pedidoId);
            // console.log(productsToCheck.produtos[i].valor_produto);
            // console.log(productsToCheck.produtos[i].produto_id);
            // console.log(productsToCheck.produtos[i].quantidade_produto);

            await knex("pedido_produtos")
                .insert({
                    pedido_id: pedidoId.id,
                    produto_id: productsToCheck.produtos[i].produto_id,
                    quantidade_produto: productsToCheck.produtos[i].quantidade_produto,
                    valor_produto: productsToCheck.produtos[i].valor_produto,
                })

        }



        // const productsToInsert = pedido_produtos.map(item => ({
        //     pedido_id: pedidoId.id,
        //     produto_id: item.produto_id,
        //     quantidade_produto: item.quantidade_produto,
        //     valor_produto: item.valor_produto,
        // }));

        // await knex("pedido_produtos").insert(productsToInsert);


    } catch (error) {
        console.log(error);
        return res.status(500).json({ messagem: "Erro interno do servidor." })
    }

    send(to)

    return res.status(201).json()

}

// const orders = async (req, res) => {
//     const { cliente_id, pedido_produtos, observacao } = req.body
//     const to = req.user.email
//     let amount = 0
//     try {
//         const customerExist = await knex("clientes").where({ id: cliente_id })

//         if (customerExist.length === 0) {
//             return res.status(404).json({ message: "Esse cliente não existe." })
//         }
//         for (let item of pedido_produtos) {

//             const productExist = await knex("produtos").where({ id: item.produto_id })

//             if (productExist.length === 0) {
//                 return res.status(404).json({ messagem: `O produto com id ${item.produto_id} não existe` })
//             }

//             if (productExist[0].quantidade_estoque < item.quantidade_produto) {
//                 return res.status(400).json({
//                     mensagem: `Para o produto id ${item.produto_id}, temos apenas ${productExist[0].quantidade_estoque} em estoque`
//                 })
//             }

//             amount += item.valor_produto
//         }

//         for (let item of pedido_produtos) {

//             const stock = await knex("produtos").where({ id: item.produto_id })

//             await knex("produtos").update({
//                 quantidade_estoque: stock[0].quantidade_estoque - item.quantidade_produto
//             }).where("id", item.produto_id)
//         }
//         const pedidos = await knex("pedidos")
//             .insert({
//                 cliente_id,
//                 observacao,
//                 valor_total: amount
//             }).returning(["id"])

//         const pedidoId = pedidos[0];

//         const productsToInsert = pedido_produtos.map(item => ({
//             pedido_id: pedidoId.id,
//             produto_id: item.produto_id,
//             valor_produto: item.valor_produto,
//             quantidade_produto: item.quantidade_produto
//         }));



//         const teste = await knex("pedido_produtos").insert(productsToInsert).returning("*")

//         console.log(teste);

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ messagem: "Erro interno do servidor." })
//     }

//     send(to)

//     return res.status(201).json()
// }

module.exports = {
    listOrders,
    orders
}