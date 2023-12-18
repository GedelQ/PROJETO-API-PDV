const joi = require("joi")

const schemaCaterogiaID = joi.object({
  categoria_id: joi.number().strict().integer().positive().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'number.base': 'O campo categoria_id deve ser um número',
    'number.positive': 'O campo categoria_id deve ser um número positivo.',
    'number.greater': 'O campo categoria_id deve ser maior que zero',
    'number.integer': 'O campo categoria_id deve ser um número inteiro'
  }),
})
const schemaCaterogiaIDArray = joi.object({
  categoria_id: joi.array().items(joi.number().positive().integer().strict()).strict().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'number.base': 'O campo categoria_id deve ser um número',
    'number.positive': 'O campo categoria_id deve ser um número positivo.',
    'number.greater': 'O campo categoria_id deve ser maior que zero',
    'number.integer': 'O campo categoria_id deve ser um número inteiro'
  }),
})
const schemaClienteID = joi.object({
  cliente_id: joi.number().strict().integer().positive().required().messages({
    'any.required': 'O campo cliente_id é obrigatório',
    'number.base': 'O campo cliente_id deve ser um número',
    'number.positive': 'O campo cliente_id deve ser um número positivo.',
    'number.greater': 'O campo cliente_id deve ser maior que zero',
    'number.integer': 'O campo cliente_id deve ser um número inteiro'
  }),
})

module.exports = { schemaCaterogiaID, schemaCaterogiaIDArray, schemaClienteID }