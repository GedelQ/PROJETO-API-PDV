const { schemaCaterogiaIDArray, schemaClienteIDArray } = require("../schemas/schemaIDs");

const validateCategoriaID = (joiSchema) => async (req, res, next) => {
    try {
        req.query.categoria_id = req.query.categoria_id.trim()
        if (typeof req.query.categoria_id === typeof "String" && req.query.categoria_id !== "") {
            req.query.categoria_id = +req.query.categoria_id
            await joiSchema.validateAsync(req.query)
        } else if (req.query.categoria_id !== "") {
            req.query.categoria_id = req.query.categoria_id.map(n => n = +n)
            joiSchema = schemaCaterogiaIDArray;
            await joiSchema.validateAsync(req.query)
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