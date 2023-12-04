const knex = require("../database/connection")


findById = async (table, id) => {
  const exists = await knex(table).where({ id: id });


  return exists.length === 0 ? false : true;
};


findByName = async (table, description) => {
  const exists = await knex(table).where({ descricao: description }).first();

  if(exists === undefined) return false;

  return exists;
};

module.exports = { findById, findByName };

