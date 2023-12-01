const joi = require("joi")

const schemaUser = joi.object({

  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo e-mail precisa ter um formato válido",
    "any.required": "O campo e-mail é obrigatório",
    "string.empty": "O campo e-mail é obrigatório"
  }),
  senha: joi.string().required().min(5).messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "A senha precisa ter 5 caracteres"
  })
})

const schemaCustomer = joi.object({

  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",

  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo e-mail precisa ter um formato válido",
    "any.required": "O campo e-mail é obrigatório",
    "string.empty": "O campo e-mail é obrigatório"
  }),
  cpf: joi.string().required().min(11).max(11).messages({
    "string.cpf": "O campo CPF precisa ter um formato válido",
    "any.required": "O campo CPF é obrigatório",
    "string.empty": "O campo CPF é obrigatório",
    "string.min": "O CPF precisa ter 11 caracteres",
    "string.max": "O CPF precisa ter no máximo 11 caracteres"
  })
})

module.exports = {
  schemaUser,
  schemaCustomer
}
