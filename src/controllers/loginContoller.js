const knex = require("../database/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  const { email, senha } = req.body
  let showStatus = 400
  let showResult = {
    message: `Campos email e senha são obrigatórios.`,
  }

  if (!email) {
    return res.status(showStatus).json(showResult)
  }
  if (!senha) {
    return res.status(showStatus).json(showResult)
  }

  try {
    const user = await knex("usuarios").where({ email }).first()

    if (!user) {
      return res.status(404).json("Usuario não encontrado")
    }

    const correctPassword = await bcrypt.compare(senha, user.senha)

    if (!correctPassword) {
      return res.status(401).json("Email ou senha estão incorretos.")
    }
    const token = jwt.sign({ id: user.id }, process.env.API_PRIVATE_KEY, {
      expiresIn: "8h",
    })

    const { senha: _, ...userData } = user

    return res.status(200).json({
      usuario: userData,
      token,
    })
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor." })
  }
}

module.exports = {
  login,
}
