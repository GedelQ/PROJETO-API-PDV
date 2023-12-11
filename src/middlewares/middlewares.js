const knex = require("../database/connection")
const jwt = require("jsonwebtoken")
const isNumber = require("../services/validatorService")

const checkUserToken = async (req, res, next) => {

    let showStatus = 401
    let showResult = {
        mensagem: `Para acessar este recurso um token de autenticação válido deve ser enviado.`
    }
    try {

        const { authorization } = req.headers
        if (!authorization) {
            return res.status(showStatus).json(showResult)
        }

        const token = authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const user = await knex("usuarios").select("id", "nome", "email").where("id", id).first()
        req.user = user
        next()

    } catch (error) {
        res.status(showStatus).json(showResult)
    }
};

function addressValidator(req, res, next) {
    const { cep, rua, numero, bairro, cidade, estado } = req.body;

    const cepValidator = isNumber(cep)
    const ruaValidator = isNumber(rua)
    const numberValidator = isNumber(numero)
    const neighborValidator = isNumber(bairro)
    const cityValidator = isNumber(cidade)
    const stateValidator = isNumber(estado)


    if (!cepValidator) { return res.status(400).json({ message: "Preencha o campo CEP somente com números" }) }

    if (ruaValidator) { return res.status(400).json({ message: "Preencha o campo RUA somente com letras" }) }

    if (!numberValidator) { return res.status(400).json({ message: "Preencha o campo NÚMERO somente com números" }) }

    if (neighborValidator) { return res.status(400).json({ message: "Preencha o campo BAIRRO somente com letras" }) }

    if (cityValidator) { return res.status(400).json({ message: "Preencha o campo CIDADE somente com letras" }) }

    if (stateValidator) { return res.status(400).json({ message: "Preencha o campo ESTADO somente com letras" }) }

    next()
}

module.exports = {
    checkUserToken,
    addressValidator
}