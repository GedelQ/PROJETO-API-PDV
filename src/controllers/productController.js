const knex = require("../database/connection");


const listProducts = async (req, res) => {

  try {
    const { categoria } = req.query
    let checkProducts

    if (!categoria) checkProducts = await knex("produtos")

    else if (typeof categoria === typeof "String")
      checkProducts = await knex("produtos").where("categoria_id", categoria)

    else checkProducts = await knex("produtos").whereIn("categoria_id", [...categoria])

    if (checkProducts.length === 0) throw new Error("Categoria Invalida")

    return res.status(200).json(checkProducts)

  } catch (error) {
    if (error.message.includes(`sintaxe de entrada é inválida para tipo integer`)) {
      return res.status(400).json("Uma ou mais categorias são inválidas. Por favor verifique se esta inserindo apenas números")
    }
    if (error.message === "Categoria Invalida") {
      return res.status(400).json("Não existe nenhuma categoria com o(s) valor(es) informado(s), por favor verifique a(s) categoria(s) solicitada(s)")
    }
    return res.status(500).json("Erro interno do servidor")
  }
}

const detailProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const userId = req.user.id

    const productFound = await knex("produtos").where("")

  } catch (error) {

  }
}

const deleteProduct = async (req, res) => {
  const produtId = req.params.id

  try {
    const checkProductExistence = await knex("produtos").where("id", produtId).first()

    if (!checkProductExistence) {
      return res.status(400).json({ messagem: "operação não realizada" })
    }

    const deleted = await knex("produtos").where("id", produtId).del()

    deleted

    return res.status(200).json({ message: "Produto removida" })
  } catch (error) {
    return res.status(500).json("Erro interno do servidor")
  }
}

module.exports = {
  listProducts,
  detailProduct,
  deleteProduct
}
