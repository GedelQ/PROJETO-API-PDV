const joi = require("joi");

const schemaProduct = joi.object({
	descricao: joi.string().required().messages({
		"any.required": "O campo descricao é obrigatório",
		"any.empty": "O campo descricao é obrigatório"
	}),
	quantidade_estoque: joi.string().email().required().messages({
		"any.required": "O campo quantidade do estoque é obrigatório",
		"any.empty": "O campo quantidade do estoque é obrigatório"
	}),
	valor: joi.string().required().messages({
		"any.required": "O campo valor é obrigatório",
		"any.empty": "O campo valor é obrigatório"
	}),
	categoria_id: joi.string().required().messages({
		"any.required": "O campo categoria_id é obrigatório",
		"any.empty": "O campo categoria_id é obrigatório"
	})
});

module.exports = schemaProduct;
