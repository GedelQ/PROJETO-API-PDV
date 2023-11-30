const knex = require("../database/connection");

const productCreation = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const category = await knex("categorias").where({ id: categoria_id });
    if (category.length == 0)
      return res.status(404).json("Categoria inválida.");

    const product = await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    if (!product) {
      return res.status(400).json({ message: "O produto não foi cadastrado." });
    }

    return res.status(201).json("Produto cadastrado com sucesso!");
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const listProducts = async (req, res) => {
  try {
    const { categoria } = req.query;
    let checkProducts;

    if (!categoria) checkProducts = await knex("produtos");
    else if (typeof categoria === typeof "String")
      checkProducts = await knex("produtos").where("categoria_id", categoria);
    else
      checkProducts = await knex("produtos").whereIn("categoria_id", [
        ...categoria,
      ]);

    if (checkProducts.length === 0) throw new Error("Categoria Invalida");

    return res.status(200).json(checkProducts);
  } catch (error) {
    if (
      error.message.includes(`sintaxe de entrada é inválida para tipo integer`)
    ) {
      return res
        .status(400)
        .json(
          "Uma ou mais categorias são inválidas. Por favor verifique se esta inserindo apenas números"
        );
    }
    if (error.message === "Categoria Invalida") {
      return res
        .status(400)
        .json(
          "Não existe nenhuma categoria com o(s) valor(es) informado(s), por favor verifique a(s) categoria(s) solicitada(s)"
        );
    }
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  listProducts,
  productCreation,
};
