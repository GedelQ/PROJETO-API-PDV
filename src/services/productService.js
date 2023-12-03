const knex = require("../database/connection");

findById = async (table, id) => {
  const exists = await knex(table).where({ id: id });

  return exists.length === 0 ? false : true;
};

module.exports = findById;
