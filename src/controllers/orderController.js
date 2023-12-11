const orderService = require("../services/orderService")

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


module.exports = {
    listOrders
}