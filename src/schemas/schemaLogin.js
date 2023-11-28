const joi = require("joi")

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "O campo e-mail precisa ter um formato válido",
    "any.required": "O campo e-mail é obrigatório",
    "any.empty": "O campo e-mail é obrigatório",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "any.empty": "O campo senha é obrigatório",
  }),
})

module.exports = schemaLogin
