const knex = require("../database/connection");

categoryExists = async (id) => {
  const category = await knex("categorias").where({ id: id });

  return category.length === 0 ? false : true;
};

module.exports = categoryExists;
