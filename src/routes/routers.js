// const validateRequestBody = require('./middlewares/validateRequestBody')
// const schemaUser = require('./schemas/schemaUser')
const express = require("express")
const { listCategories } = require("../controllers/categorieController")
const { userRegister } = require("../controllers/userController")

const routes = express()

routes.get("/categoria", listCategories)

routes.post("/usuario", userRegister)

module.exports = routes
