PRINT-2-Detalhar-Produto
const express = require("express")
const { listCategories } = require("../controllers/categorieController")
const { login } = require("../controllers/loginContoller")
const { userRegister, userDetail, userUpdate } = require("../controllers/userController")
const checkUserToken = require("../middlewares/middlewares")
const validateRequestBody = require("../middlewares/validateRequestBody")
const schemaLogin = require("../schemas/schemaLogin")
const schemaUser = require("../schemas/schemaUser")
const { listProducts, deleteProduct, productCreation } = require("../controllers/productController")
const { listCustomers, datailCustomers } = require("../controllers/customerController")

const routes = express()


routes.get("/categoria", listCategories)
routes.post("/usuario", validateRequestBody(schemaUser), userRegister)
routes.post("/login", validateRequestBody(schemaLogin), login)
routes.use(checkUserToken)
routes.get("/usuario", userDetail)
routes.put("/usuario", validateRequestBody(schemaUser), userUpdate)
routes.get("/produto", listProducts)
routes.delete("/produto/:id", deleteProduct)


routes.get("/cliente", listCustomers);
routes.get("/cliente/:id", datailCustomers);

routes.post("/produto", validateRequestBody(schemaProduct), productCreation);

module.exports = routes