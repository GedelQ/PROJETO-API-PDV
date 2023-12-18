const { json } = require("express")
const knex = require("../database/connection")
const productService = require("../services/productService")
const awsService = require('../services/s3Service')

const productCreation = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const produto_imagem = req.file

  try {
    const productExists = await productService.findByName("produtos", descricao)

    if (productExists.id > 0) {
      const newQtd = Number(productExists.quantidade_estoque) + Number(quantidade_estoque)

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

    const arquivo = await awsService.uploadFile(`imagens/${produto_imagem.originalname}`, produto_imagem.buffer, produto_imagem.mimetype)

    const product = await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: arquivo.url
    }).returning('*')

    if (!product) {
      return res.status(400).json({ message: "O produto não foi cadastrado." })
    }

    return res.status(201).json(product[0])
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const updateProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const { id } = req.params
  const produto_imagem = req.file


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

    const arquivo = await awsService.uploadFile(`imagens/${produto_imagem.originalname}`, produto_imagem.buffer, produto_imagem.mimetype)

    const product = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: arquivo.url
      })
      .where({ id: id }).returning('*')

    return res.status(200).json(product[0])
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const listProducts = async (req, res) => {
  try {
    const { categoria_id } = req.query

    const products = await findByCategory(categoria_id)

    if (products.length === 0) {
      throw ({ message: "Invalid" })
    }

    return res.status(200).json(products)
  } catch (error) {
    if (
      error.message.toLowerCase().includes(`inválida`) || error.message.toLowerCase().includes(`invalid`)
    ) {
      return res.status(400).json({
        message:
          "Uma ou mais categorias são inválidas. Por favor verifique se esta inserindo apenas números e se a categoria solicitada existe."
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

    const orderExist = await knex("pedido_produtos").where({ produto_id: productId })
    if (orderExist.length !== 0) {
      return res.status(404).json({ message: "Produto consta em um pedido já cadastrado. Não foi possível realizar a exclusão." })
    }

    const productFound = await knex("produtos")
      .where("id", productId)
      .del()
      .returning("*")

    if (productFound.length === 0) {
      return res.status(404).json({ messagem: "Produto não encontrado." })
    }

    if (productFound.produto_imagem !== null) {
      const itemASerDeletado = await awsService.deleteFile(productFound[0].produto_imagem)

      return res.status(200).json({ message: "Produto e imagem removidos." })
    } else {
      return res.status(200).json({ message: "Produto removido." })
    }
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
