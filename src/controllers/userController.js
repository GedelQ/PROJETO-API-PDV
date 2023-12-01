const knex = require("../database/connection")
const bcrypt = require("bcrypt")

const userRegister = async (req, res) => {

  const { nome, email, senha } = req.body

  try {
    const encryptedPassword = await bcrypt.hash(senha, 10)

    const user = await knex("usuarios")
      .insert({ nome, email: email.toLowerCase(), senha: encryptedPassword })
      .returning(["id", "nome", "email"])

    if (!user) {
      return res.status(400).json({ message: "O usuário não foi cadastrado." })
    }

    return res.status(201).json(user)
  } catch (error) {
    const duplicateMail = "usuarios_email_key"
    if (
      error.message.includes(duplicateMail)
    ) {
      return res.status(400).json({ message: "E-mail já existe." })
    } else return res.status(500).json("Erro interno do servidor")
  }

}

const userDetail = async (req, res) => {
  const user = req.user

  return res.status(200).json(user)
}

const userUpdate = async (req, res) => {

  const { nome, email, senha } = req.body
  const { id } = req.user

  try {
    const encryptedPassword = await bcrypt.hash(senha, 10)

    const userUpdated = await knex("usuarios")
      .update({
        nome,
        email: email.toLowerCase(),
        senha: encryptedPassword
      })
      .where("id", id)
      .returning(["id", "nome", "email"])

    return res.status(200).json(userUpdated)
  } catch (error) {
    const duplicateMail = "usuarios_email_key"

    if (error.message.includes(duplicateMail)) {
      return res.status(400).json({ message: "E-mail já existe." })
    }
    else return res.status(500).json("Erro interno do servidor")
  }
  
}

module.exports = {
  userRegister,
  userDetail,
  userUpdate,
}
