const knex = require("../database/connection")

findById = async (table, id) => {
  const exists = await knex(table).where({ id: id })

  return exists.length === 0 ? false : true
}

findByName = async (table, description) => {
  const exists = await knex(table).where({ descricao: description }).first()

  if (exists === undefined) return false

  return exists
}

findByCategory = async (categoria_id) => {

  let products

  if (!categoria_id) {
    products = await knex("produtos")

  } else if (typeof categoria_id !== "String") {
    products = await knex("produtos").where("categoria_id", categoria_id)
  }
  else {
    products = await knex("produtos").whereIn("categoria_id", [...categoria_id])
  }

  return products
}

module.exports = { findById, findByName, findByCategory }
