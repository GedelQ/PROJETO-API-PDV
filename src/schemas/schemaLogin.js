const joi = require("joi")

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "O campo e-mail precisa ter um formato válido.",
    "any.required": "O campo e-mail é obrigatório.",
    "string.empty": "O campo e-mail é obrigatório.",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.empty": "O campo senha é obrigatório.",
    "string.pattern.base": "A senha precisa ter um formato valído.",
  }),
})

module.exports = schemaLogin
