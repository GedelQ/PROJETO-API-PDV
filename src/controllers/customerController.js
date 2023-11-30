const knex = require("../database/connection")

const custumerRegister = async (req, res) => {

  const { nome, email, cpf } = req.body

  try {

    const customer = await knex("clientes")
      .insert({ nome, email: email.toLowerCase(), cpf })
      .returning(["id", "nome", "email", "cpf"])

    if (!customer) {
      return res.status(400).json({ message: "O cliente não foi cadastrado." })
    }

    return res.status(201).json(customer)
  } catch (error) {
    console.log(error)

    const duplicateMail = "clientes_email_key"
    const duplicateCPF = "clientes_cpf_key"

    if (
      error.message.includes(duplicateMail)
    ) {
      return res.status(400).json({ message: "E-mail já existe." })
    }
    else if (
      error.message.includes(duplicateCPF)
    ) {
      return res.status(400).json({ message: "CPF já existe." })
    } else
      return res.status(500).json("Erro interno do servidor")
  }

}

module.exports = { custumerRegister }
