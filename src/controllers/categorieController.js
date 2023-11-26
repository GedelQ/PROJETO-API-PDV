const knex = require("../database/connection")

const listCategories = async (req, res) => {
  try {
    const checkCategories = await knex("categorias")
    if (!checkCategories) {
      return res
        .status(404)
        .json({ message: "Sem categorias para serem listas." })
    }

    return res.status(200).json(checkCategories)
  } catch (error) {
    console.log(error)
    return res.status(500).json("Erro interno do servidor")
  }
}

module.exports = {
  listCategories,
}
