const joi = require("joi")

const schemaOrder = joi.object({

    cliente_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.base': 'O campo cliente_id deve ser um número',
        'number.positive': 'O campo cliente_id deve ser um número positivo.',
        'number.greater': 'O campo cliente_id deve ser maior que zero',
        'number.integer': 'O campo cliente_id deve ser um número inteiro'
    }),

    observacao: joi.string().trim().max(150).messages({
        "string.observacao": "O campo observacao precisa ter um formato válido.",
        "string.base": "O campo observacao deve ser string.",
        "string.empty": "O campo observacao não pode ser vazio.",
        "string.max": "O campo observacao precisa ter no máximo 150 caracteres.",
    }),

    pedido_produtos: joi.array().items(joi.object({

        produto_id: joi.number().strict().integer().positive().required().messages({
            'any.required': 'O campo produto_id é obrigatório',
            'number.base': 'O campo produto_id deve ser um número',
            'number.positive': 'O campo produto_id deve ser um número positivo.',
            'number.greater': 'O campo produto_id deve ser maior que zero',
            'number.integer': 'O campo produto_id deve ser um número inteiro'
        }),
        quantidade_produto: joi.number().strict().integer().positive().required().messages({
            'any.required': 'O campo quantidade_produto é obrigatório',
            'number.base': 'O campo quantidade_produto deve ser um número',
            'number.positive': 'O campo quantidade_produto deve ser um número positivo.',
            'number.greater': 'O campo quantidade_produto deve ser maior que zero',
            'number.integer': 'O campo quantidade_produto deve ser um número inteiro'
        }),
        valor_produto: joi.number().strict().integer().positive().messages({
            'any.required': 'O campo valor_produto é obrigatório',
            'number.base': 'O campo valor_produto deve ser um número',
            'number.positive': 'O campo valor_produto deve ser um número positivo.',
            'number.greater': 'O campo valor_produto deve ser maior que zero',
            'number.integer': 'O campo valor_produto deve ser um número inteiro'
        }),
    })).required().messages({
        'any.required': 'O objeto pedido_produtos é obrigatório'
    })

})

module.exports = schemaOrder