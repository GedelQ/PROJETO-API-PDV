const joi = require("joi")

const schemaProduct = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório.",
    "string.empty": "O campo descrição é obrigatório.",
    "string.base": "O campo descrição deve ser string.",
  }),
  quantidade_estoque: joi.number().integer().positive().required().messages({
    'any.required': 'O campo quantidade do estoque é obrigatório',
    'number.base': 'O campo quantidade do estoque deve ser um número',
    'number.positive': 'O campo quantidade do estoque deve ser um número positivo.',
    'number.greater': 'O campo quantidade do estoque deve ser maior que zero',
    'number.integer': 'O campo quantidade do estoque deve ser um número inteiro'
  }),
  valor: joi.number().integer().positive().required().messages({
    'any.required': 'O campo valor é obrigatório',
    'number.base': 'O campo valor deve ser um número',
    'number.positive': 'O campo valor deve ser um número positivo',
    'number.greater': 'O campo valor deve ser maior que zero',
    'number.integer': 'O campo valor deve ser um número inteiro',
  }),
  categoria_id: joi.number().integer().positive().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'number.base': 'O campo categoria_id deve ser um número',
    'number.integer': 'O campo categoria_id deve ser um número inteiro',
    'number.positive': 'O campo categoria_id deve ser um número positivo',
    'number.integer': 'O campo categoria_id deve ser um número inteiro',
  }),
})

module.exports = schemaProduct
