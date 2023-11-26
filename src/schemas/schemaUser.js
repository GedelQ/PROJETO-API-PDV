const joi = require('joi')

const schemaUser = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'any.empty': 'O campo nome é obrigatório',
    }),
    email: joi.string().email().required().messages({
        'string.email': 'O campo e-mail precisa ter um formato válido',
        'any.required': 'O campo e-mail é obrigatório',
        'any.empty': 'O campo e-mail é obrigatório'
    }),
    senha: joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'any.empty': 'O campo senha é obrigatório',
        'string.min': 'A senaha precisa conter, no mínimo, 5 caracteres'
    })
})

module.exports = schemaUser