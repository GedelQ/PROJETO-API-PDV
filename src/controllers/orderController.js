
const knex = require("../database/connection")
const send = require("../services/nodemailer")
const { findByClient } = require("../services/orderService")

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
            error.message.toLowerCase().includes(`inválida`) 
            || error.message.toLowerCase().includes(`invalid`)
            || error.message.toLowerCase().includes(`not defined`)
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
    const productsToCheck = { produtos: [] }
    const stock = { stockProducts: [] }
    let totalAmount = 0

    try {
        const customerExist = await knex("clientes").where({ id: cliente_id })

        if (customerExist.length === 0) {
            return res.status(404).json({ message: "Esse cliente não existe." })
        }

        for (let item of pedido_produtos) {
            const productId = item.produto_id

            const existingProductIndex = productsToCheck.produtos.findIndex(p => p.produto_id === productId)

            if (existingProductIndex === -1) {
                productsToCheck.produtos.push({
                    produto_id: productId,
                    quantidade_produto: item.quantidade_produto,
                    valor_produto: item.valor_produto * item.quantidade_produto
                })
            } else {
                return res.status(400).json({
                    messagem: `Você está tentando cadastrar o produto id ${productId} mais de uma vez`
                })
            }

            totalAmount += item.valor_produto * item.quantidade_produto
        }

        for (let product of productsToCheck.produtos) {

            const productExist = await knex("produtos").where({ id: product.produto_id })


            if (productExist.length === 0) {
                return res.status(404).json({ messagem: `O produto com id ${product.produto_id} não existe` })
            }

            if (productExist[0].quantidade_estoque < product.quantidade_produto) {
                return res.status(400).json({
                    mensagem: `Para o produto id ${product.produto_id}, temos apenas ${productExist[0].quantidade_estoque} em estoque`
                })
            }

            stock.stockProducts.push({
                stock: productExist[0].quantidade_estoque
            })

        }

        const pedidos = await knex("pedidos")
            .insert({
                cliente_id,
                observacao,
                valor_total: totalAmount
            }).returning(["id"])

        const pedidoId = pedidos[0]

        for (let i = 0; i < productsToCheck.produtos.length; i++) {

            await knex("produtos").update({
                quantidade_estoque: stock.stockProducts[i].stock - productsToCheck.produtos[i].quantidade_produto
            }).where({ id: productsToCheck.produtos[i].produto_id })

            await knex("pedido_produtos")
                .insert({
                    pedido_id: pedidoId.id,
                    produto_id: productsToCheck.produtos[i].produto_id,
                    quantidade_produto: productsToCheck.produtos[i].quantidade_produto,
                    valor_produto: productsToCheck.produtos[i].valor_produto,
                })
        }

        send(to)

        return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ messagem: "Erro interno do servidor." })
    }

}

module.exports = {
    listOrders,
    orders
}
