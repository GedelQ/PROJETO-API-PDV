const express = require("express");
const { listCategories } = require("../controllers/categorieController");
const { login } = require("../controllers/loginContoller");
const userController = require("../controllers/userController");
const checkUserToken = require("../middlewares/middlewares");
const validateRequestBody = require("../middlewares/validateRequestBody");
const schemaLogin = require("../schemas/schemaLogin");
const { schemaUser, schemaCustomer } = require("../schemas/schemaUser");
const schemaProduct = require("../schemas/schemaProduct");
const productController = require("../controllers/productController");
const costumerController = require("../controllers/customerController");

const routes = express();

routes.get("/categoria", listCategories);
routes.post("/usuario", validateRequestBody(schemaUser), userController.userRegister);
routes.post("/login", validateRequestBody(schemaLogin), login);

routes.use(checkUserToken);

routes.get("/usuario", userController.userDetail);
routes.put("/usuario", validateRequestBody(schemaUser), userController.userUpdate);

routes.post("/produto", validateRequestBody(schemaProduct), productController.productCreation);
routes.get("/produto", productController.listProducts);
routes.put("/produto/:id", validateRequestBody(schemaProduct), productController.updateProducts);
routes.delete("/produto/:id", productController.deleteProduct);
routes.get("/produto/:id", productController.detailProduct);

routes.post("/cliente", validateRequestBody(schemaCustomer), costumerController.customerRegister);
routes.get("/cliente", costumerController.listCustomers);
routes.put("/cliente/:id", validateRequestBody(schemaCustomer), costumerController.customerUpdate);
routes.get("/cliente/:id", costumerController.datailCustomers);

module.exports = routes;
