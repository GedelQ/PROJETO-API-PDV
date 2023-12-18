const express = require("express")
const { listCategories } = require("../controllers/categorieController")
const { login } = require("../controllers/loginContoller")
const userController = require("../controllers/userController")
const checkUserToken = require("../middlewares/middlewares")
const validateRequestBody = require("../middlewares/validateRequestBody")
const schemaLogin = require("../schemas/schemaLogin")
const { schemaUser, schemaCustomer } = require("../schemas/schemaUser")
const schemaProduct = require("../schemas/schemaProduct")
const productController = require("../controllers/productController")
const costumerController = require("../controllers/customerController")
const verifyIdIsNumber = require("../middlewares/verifyIdIsNumber")
const orderController = require("../controllers/orderController")
const multer = require("../middlewares/uploadImg")
const schemaOrder = require("../schemas/schemaOrder")
const { validateCategoriaID, validateClienteID } = require("../middlewares/validadeIDs")
const { schemaCaterogiaID, schemaClienteID } = require("../schemas/schemaIDs")


const routes = express()

routes.get("/categoria", listCategories)
routes.post(
  "/usuario",
  validateRequestBody(schemaUser),
  userController.userRegister
)
routes.post("/login", validateRequestBody(schemaLogin), login)

routes.use(checkUserToken)

routes.get("/usuario", userController.userDetail)
routes.put(
  "/usuario",
  validateRequestBody(schemaUser),
  userController.userUpdate
)

routes.post(
  "/produto", multer.single('produto_imagem'),
  validateRequestBody(schemaProduct),
  productController.productCreation
)
routes.get("/produto", validateCategoriaID(schemaCaterogiaID), productController.listProducts)
routes.put(
  "/produto/:id", multer.single('produto_imagem'),
  verifyIdIsNumber,
  validateRequestBody(schemaProduct),
  productController.updateProducts
)
routes.delete("/produto/:id", verifyIdIsNumber, productController.deleteProduct)
routes.get("/produto/:id", verifyIdIsNumber, productController.detailProduct)

routes.post(
  "/cliente",
  validateRequestBody(schemaCustomer),
  costumerController.customerRegister
)
routes.get("/cliente", costumerController.listCustomers)
routes.put(
  "/cliente/:id",
  validateRequestBody(schemaCustomer),
  costumerController.customerUpdate
)
routes.get("/cliente/:id", verifyIdIsNumber, costumerController.datailCustomers)

routes.get("/pedido", validateClienteID(schemaClienteID), orderController.listOrders)

routes.post("/pedido", validateRequestBody(schemaOrder), orderController.orders)

module.exports = routes
