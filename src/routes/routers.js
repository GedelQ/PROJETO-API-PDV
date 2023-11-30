const express = require("express")
const { listCategories } = require("../controllers/categorieController")
const { login } = require("../controllers/loginContoller")
const { userRegister, userDetail, userUpdate } = require("../controllers/userController")
const checkUserToken = require("../middlewares/middlewares")
const validateRequestBody = require("../middlewares/validateRequestBody")
const schemaLogin = require("../schemas/schemaLogin")
const { schemaUser, schemaCustomer } = require("../schemas/schemaUser")
const { listProducts } = require("../controllers/productController")
const { custumerRegister } = require("../controllers/customerController")


const routes = express()



routes.get("/categoria", listCategories)
routes.post("/usuario", validateRequestBody(schemaUser), userRegister)
routes.post("/login", validateRequestBody(schemaLogin), login)

routes.use(checkUserToken)

routes.post("/cliente", validateRequestBody(schemaCustomer), custumerRegister)
routes.get("/usuario", userDetail)
routes.put("/usuario", validateRequestBody(schemaUser), userUpdate)
routes.get("/produto", listProducts)



module.exports = routes




