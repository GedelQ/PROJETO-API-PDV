// const validateRequestBody = require('./middlewares/validateRequestBody')
// const schemaUser = require('./schemas/schemaUser')
const express = require("express");
const { listCategories } = require("../controllers/categorieController");
const { login } = require("../controllers/loginContoller");
const { userRegister, userDetail, userUpdate } = require("../controllers/userController");
const checkUserToken = require("../middlewares/middlewares");
const validateRequestBody = require("../middlewares/validateRequestBody")
const schemaUser = require("../schemas/schemaUser")

const routes = express();

routes.get("/categoria", listCategories);

routes.post("/usuario", userRegister);

routes.post("/login", login);

routes.use(checkUserToken);

routes.get("/usuario", userDetail);
routes.put("/usuario", validateRequestBody(schemaUser), userUpdate);

module.exports = routes;
