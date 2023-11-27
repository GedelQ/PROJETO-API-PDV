const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    database: process.env.SQL_DATABASE,
  },
})

module.exports = knex
