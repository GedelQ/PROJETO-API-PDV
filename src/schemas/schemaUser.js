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

  cep: joi.string().regex(/^[0-9]+$/).trim().min(8).max(8).messages({
    "string.CEP": "O campo CEP precisa ter um formato válido.",
    "string.min": "O CEP precisa ter 8 caracteres.",
    "string.max": "O CEP precisa ter no máximo 8 caracteres.",
    "string.base": "O campo CEP deve ser string.",
    "string.empty": "O campo CEP não pode ser vazio.",
    "string.pattern.base": "O cep deve conter apenas números sem espaços"
  }),

  rua: joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/).trim().max(50).messages({
    "string.rua": "O campo rua precisa ter um formato válido.",
    "string.base": "O campo rua deve ser string.",
    "string.empty": "O campo rua não pode ser vazio.",
    "string.max": "O campo rua precisa ter no máximo 50 caracteres.",
    "string.pattern.base": "O campo rua deve conter apenas letras"
  }),

  numero: joi.string().regex(/^[0-9]+$/).trim().max(10).messages({
    "string.numero": "O campo número precisa ter um formato válido.",
    "string.max": "O número precisa ter no máximo 10 caracteres.",
    "string.base": "O número deve ser string.",
    "string.empty": "O campo número não pode ser vazio.",
    "string.pattern.base": "O campo numero deve conter apenas números sem espaços"
  }),

  bairro: joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/).trim().max(50).messages({
    "string.bairro": "O campo bairro precisa ter um formato válido.",
    "string.base": "O campo bairro deve ser string.",
    "string.empty": "O campo bairro não pode ser vazio.",
    "string.max": "O campo bairro precisa ter no máximo 50 caracteres.",
    "string.pattern.base": "O campo bairro deve conter apenas letras"
  }),

  cidade: joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/).trim().max(50).messages({
    "string.cidade": "O campo cidade precisa ter um formato válido.",
    "string.base": "O campo cidade deve ser string.",
    "string.empty": "O campo cidade não pode ser vazio.",
    "string.max": "O campo rua precisa ter no máximo 50 caracteres.",
    "string.pattern.base": "O campo cidade deve conter apenas letras"
  }),

  estado: joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/).trim().max(30).messages({
    "string.CEP": "O campo estado precisa ter um formato válido.",
    "string.base": "O campo estado deve ser string.",
    "string.empty": "O campo estado não pode ser vazio.",
    "string.max": "O campo estado precisa ter no máximo 30 caracteres.",
    "string.pattern.base": "O campo estado deve conter apenas letras"

  }),

})

module.exports = {
  schemaUser,
  schemaCustomer,
}
