const knex = require("../database/connection")
const jwt = require("jsonwebtoken")

const checkUserToken = async (req, res, next) => {
    let showStatus = 401
    let showResult = {
        mensagem: `Para acessar este recurso um token de autenticação válido deve ser enviado.`
    }

    const { authorization } = req.headers
    if (!authorization) {
        return res.status(showStatus).json(showResult)
    }

    try {
        const token = authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const user = await knex("usuarios").select("id", "nome", "email").where("id", id).first()
        req.user = user
        next()

    } catch (error) {
        res.status(showStatus).json(showResult)
    }
};

module.exports = checkUserToken