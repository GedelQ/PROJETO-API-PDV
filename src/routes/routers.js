// const validateRequestBody = require('./middlewares/validateRequestBody')
// const schemaUser = require('./schemas/schemaUser')
const express = require("express")
const { listCategories } = require("../controllers/categorieController")

const routes = express()

routes.get("/categoria", listCategories)

module.exports = routes
