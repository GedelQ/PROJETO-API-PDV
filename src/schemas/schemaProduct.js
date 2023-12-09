const joi = require("joi")

const schemaProduct = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório.",
    "string.empty": "O campo descrição é obrigatório.",
    "string.base": "O campo descrição deve ser string.",
  }),
  quantidade_estoque: joi.number().strict().integer().positive().required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório",
    "string.empty": "O campo quantidade_estoque é obrigatório",
    "number.positive": "O campo quantidade_estoque precisa ser um número positivo.",
    "number.base": "O campo quantidade_estoque precisa ser um número inteiro.",
    "number.integer": "O campo quantidade_estoque precisa ser um número inteiro.",
  }),
  valor: joi.number().strict().integer().positive().required().messages({
    "any.required": "O campo valor é obrigatório",
    "string.empty": "O campo valor é obrigatório",
    "number.positive": "O campo valor precisa ser um número positivo.",
    "number.base": "O campo valor precisa ser um número inteiro.",
    "number.integer": "O campo valor precisa ser um número inteiro.",
  }),
  categoria_id: joi.number().strict().integer().positive().required().messages({
    "any.required": "O campo categoria_id é obrigatório.",
    "string.empty": "O campo categoria_id é obrigatório.",
    "number.positive": "O campo categoria_id precisa ser um número positivo.",
    "number.base": "O campo categoria_id precisa ser um número inteiro.",
    "number.integer": "O campo categoria_id precisa ser um número inteiro.",
  }),
})

module.exports = schemaProduct
