const express = require("express")
const { listCategories } = require("../controllers/categorieController")
const { login } = require("../controllers/loginContoller")
const {
  userRegister,
  userDetail,
  userUpdate,
} = require("../controllers/userController")
const checkUserToken = require("../middlewares/middlewares")
const validateRequestBody = require("../middlewares/validateRequestBody")
const schemaLogin = require("../schemas/schemaLogin")
const {
  schemaUser,
  schemaCustomer } = require("../schemas/schemaUser")
const schemaProduct = require("../schemas/schemaProduct")
const {
  listProducts,
  productCreation,
  updateProducts,
  deleteProduct,
  detailProduct,
} = require("../controllers/productController")
const {
  listCustomers,
  datailCustomers,
  custumerRegister,
} = require("../controllers/customerController")

const routes = express()

routes.get("/categoria", listCategories)
routes.post("/usuario", validateRequestBody(schemaUser), userRegister)
routes.post("/login", validateRequestBody(schemaLogin), login)
routes.use(checkUserToken)
routes.get("/usuario", userDetail)
routes.put("/usuario", validateRequestBody(schemaUser), userUpdate)
routes.get("/produto", listProducts)
routes.get("/produto/:id", detailProduct)
routes.delete("/produto/:id", deleteProduct)

routes.post("/cliente", validateRequestBody(schemaCustomer), custumerRegister)
routes.get("/cliente", listCustomers)
routes.get("/cliente/:id", datailCustomers)

routes.post("/produto", validateRequestBody(schemaProduct), productCreation)
routes.put("/produto/:id", validateRequestBody(schemaProduct), updateProducts)

module.exports = routes
