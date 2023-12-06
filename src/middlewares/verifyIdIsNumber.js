const validatorService = require("../services/validatorService")

const verifyIdIsNumber = async (req, res, next) => {
  const { id } = req.params
  try {
    const verifyIdNumber = validatorService(id)
    if (!verifyIdNumber) {
      return res.status(404).json({
        message: "ID inválido, verifique se foi utilizado números inteiros.",
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

module.exports = verifyIdIsNumber
