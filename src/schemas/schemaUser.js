const joi = require("joi")

const schemaUser = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    "string.base": "O campo nome de ser uma string",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo e-mail precisa ter um formato válido",
    "any.required": "O campo e-mail é obrigatório",
    "string.empty": "O campo e-mail é obrigatório",
  }),
  senha: joi.string().required().min(5).messages({
    "any.required": "O campo senha é obrigatório",
    "string.min": "A senha precisa ter 5 caracteres",
    "string.empty": "O campo senha é obrigatório",
  }),
})

const schemaCustomer = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório.",
    "string.empty": "O campo nome é obrigatório.",
    "string.base": "O campo mome deve ser string.",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo e-mail precisa ter um formato válido.",
    "any.required": "O campo e-mail é obrigatório.",
    "string.empty": "O campo e-mail é obrigatório.",
  }),
  cpf: joi.string().required().min(11).max(11).messages({
    "string.cpf": "O campo CPF precisa ter um formato válido.",
    "any.required": "O campo CPF é obrigatório.",
    "string.empty": "O campo CPF é obrigatório.",
    "string.min": "O CPF precisa ter 11 caracteres.",
    "string.max": "O CPF precisa ter no máximo 11 caracteres.",
    "string.base": "O campo CPF deve ser string.",
  }),

  cep: joi.string().min(8).max(8).messages({
    "string.CEP": "O campo CEP precisa ter um formato válido.",
    "string.min": "O CEP precisa ter 11 caracteres.",
    "string.max": "O CEP precisa ter no máximo 8 caracteres.",
    "string.base": "O campo CEP deve ser string.",
  }),

  rua: joi.string().messages({
    "string.rua": "O campo rua precisa ter um formato válido.",
    "string.base": "O campo rua deve ser string.",
  }),

  numero: joi.string().min(1).max(10).messages({
    "string.numero": "O campo numero precisa ter um formato válido.",
    "string.min": "O numero precisa ter 1 caracteres.",
    "string.max": "O numero precisa ter no máximo 10 caracteres.",
    "string.base": "O numero deve ser string.",
  }),

  bairro: joi.string().messages({
    "string.bairro": "O campo bairro precisa ter um formato válido.",
    "string.base": "O campo bairro deve ser string.",
  }),

  cidade: joi.string().messages({
    "string.cidade": "O campo cidade precisa ter um formato válido.",
    "string.base": "O campo cidade deve ser string.",
  }),

  estado: joi.string().messages({
    "string.CEP": "O campo CEP precisa ter um formato válido.",
    "string.base": "O campo CEP deve ser string.",
  }),

})

module.exports = {
  schemaUser,
  schemaCustomer,
}
