const { findByClient } = require("../services/productService")

const listProducts = async (req, res) => {
    try {
        const { cliente_id } = req.query

        const orders = findByClient("pedidos").leftjoin("pedido_produtos").where("cliente_id", cliente_id)

        console.log(orders);


        if (orders.length === 0) {
            throw new Error({ message: "Invalid" })
        }

        // return res.status(200).json(orders)
    } catch (error) {
        if (
            error.message.toLowerCase().includes(`inválida`) || error.message.toLowerCase().includes(`invalid`)
        ) {
            return res.status(400).json({
                message:
                    "Uma ou mais categorias são inválidas. Por favor verifique se esta inserindo apenas números e se a(s) categoria(s) solicitada existe."
            })
        }

        return res.status(500).json({ message: "Erro interno do servidor." })
    }
}


module.exports = {
    listProducts
}