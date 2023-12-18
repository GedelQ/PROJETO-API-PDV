const knex = require("../database/connection")

findByClient = async (cliente_id) => {

    if (cliente_id) {
        const orders = await knex("pedidos").where("cliente_id", cliente_id).orderBy("id")

        if (orders.length !== 0) {
            let orderAndProducts = []

            for (const order of orders) {
                let orderProducts = await knex("pedido_produtos").where("pedido_id", order.id)

                orderAndProducts.push({ pedido: order, pedido_produtos: orderProducts })
            }

            return orderAndProducts
        }

        return orders
    }

    const orders = await knex("pedidos").orderBy("id")

    if (orders.length !== 0) {
        let orderAndProducts = []

        for (const order of orders) {
            let orderProducts = await knex("pedido_produtos").where("pedido_id", order.id)

            orderAndProducts.push({ pedido: order, pedido_produtos: orderProducts })
        }

        return orderAndProducts
    }

    return orders

}

module.exports = { findByClient }