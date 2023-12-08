const knex = require("../database/connection")
const productService = require("../services/productService")
const isNumber = require("../services/validatorService")
const validatorService = require("../services/validatorService")

const productCreation = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  try {
    const productExists = await productService.findByName("produtos", descricao)

    if (productExists.id > 0) {
      const newQtd = productExists.quantidade_estoque + quantidade_estoque

      const addQtdProduct = await knex("produtos")
        .where({ descricao: descricao })
        .update({ quantidade_estoque: newQtd })

      return res.status(200).json({
        message:
          "Produto existente em nosso estoque, quantidade somada no produto.",
      })
    }

    const categoryExist = await productService.findById(
      "categorias",
      categoria_id
    )
    if (!categoryExist) return res.status(404).json("Categoria inválida.")

    const product = await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    })

    if (!product) {
      return res.status(400).json({ message: "O produto não foi cadastrado." })
    }

    return res.status(201).json({ message: "Produto cadastrado com sucesso!" })
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const updateProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const { id } = req.params

  try {
    const productExist = await productService.findById("produtos", id)

    if (!productExist)
      return res
        .status(404)
        .json({ message: "Produto não existe em nosso estoque." })

    const categoryExist = await productService.findById(
      "categorias",
      categoria_id
    )
    if (!categoryExist) return res.status(404).json("Categoria inválida.")

    await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .where({ id: id })

    return res.status(201).json({ message: "Produto atualizado com sucesso!" })
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const listProducts = async (req, res) => {
  try {
    const { categoria } = req.query
    let checkProducts

    if (!categoria) checkProducts = await knex("produtos")
    else if (typeof categoria !== "String")
      checkProducts = await knex("produtos").where("categoria_id", categoria)
    else
      checkProducts = await knex("produtos").whereIn("categoria_id", [
        ...categoria,
      ])

    if (checkProducts.length === 0)
      throw new Error({ message: "Categoria Invalida." })

    return res.status(200).json(checkProducts)
  } catch (error) {
    if (
      error.message.includes(`Sintaxe de entrada é inválida para tipo integer.`)
    ) {
      return res.status(400).json({
        message:
          "Uma ou mais categorias são inválidas. Por favor verifique se esta inserindo apenas números.",
      })
    }
    if (error.message === "Categoria Invalida") {
      return res.status(400).json({
        message:
          "Não existe nenhuma categoria com o(s) valor(es) informado(s), por favor verifique a(s) categoria(s) solicitada(s).",
      })
    }
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const detailProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const productFound = await knex("produtos")
      .where("id", productId)
      .first()

    if (!productFound) {
      return res.status(404).json({ message: "Produto não encontrado." })
    }
    return res.status(200).json(productFound)
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const productFound = await knex("produtos")
      .where("id", productId)
      .first()
      .del()

    if (!productFound) {
      return res.status(404).json({ messagem: "Produto não encontrado." })
    }

    return res.status(200).json({ message: "Produto removido." })
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

module.exports = {
  listProducts,
  detailProduct,
  deleteProduct,
  productCreation,
  updateProducts,
}
