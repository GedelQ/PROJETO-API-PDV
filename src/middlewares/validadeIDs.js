const { schemaCaterogiaIDArray } = require("../schemas/schemaIDs");

const validateCategoriaID = (joiSchema) => async (req, res, next) => {
    try {
        const type = typeof req.query.categoria_id

        if (type === typeof "String" || type === typeof 1) {
            req.query.categoria_id = req.query.categoria_id.trim()
            if (req.query.categoria_id !== "") {
                req.query.categoria_id = +req.query.categoria_id
                await joiSchema.validateAsync(req.query)
            }
        } else if (type === typeof []) {
            req.query.categoria_id = req.query.categoria_id.map(n => n = +n)
            const joiSchema2 = schemaCaterogiaIDArray;
            await joiSchema2.validateAsync(req.query)
        }

        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}
const validateClienteID = (joiSchema) => async (req, res, next) => {
    req.query.cliente_id = req.query.cliente_id.trim()
    try {
        if (req.query.cliente_id !== "") {
            req.query.cliente_id = +req.query.cliente_id
            await joiSchema.validateAsync(req.query)
        }

        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = { validateCategoriaID, validateClienteID }