const knex = require("../database/connection")
const isNumber = require("../services/validatorService")
const { findById } = require("../services/productService")

const customerRegister = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

  try {
    const validator = isNumber(cpf)

    if (!validator) {

      return res
        .status(400)
        .json({ message: "O campo CPF precisa ser um número" })

    }
    const customer = await knex("clientes")

      .insert({ nome: nome.trim(), email: email.toLowerCase(), cpf, cep, rua, numero, bairro, cidade, estado })
      .returning(["id", "nome", "email", "cpf", "cep", "rua", "numero", "bairro", "cidade", "estado"])


    if (!customer) {
      return res.status(400).json({ message: "O cliente não foi cadastrado." })
    }

    return res.status(201).json(customer[0])
 
  } catch (error) {

    const duplicateMail = "clientes_email_key"
    const duplicateCPF = "clientes_cpf_key"

    if (error.message.includes(duplicateMail)) {
      return res.status(400).json({ message: "E-mail já existe." })
    } else if (error.message.includes(duplicateCPF)) {
      return res.status(400).json({ message: "CPF já existe." })
    } else return res.status(500).json({ message: "Erro interno do servidor." })
  }
}


const listCustomers = async (req, res) => {
  try {
    const checkCostumer = await knex("clientes")
    if (checkCostumer.length < 1) {
      return res
        .status(404)
        .json({ message: "Sem clientes para serem listos." })
    }

    return res.status(200).json(checkCostumer)
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const datailCustomers = async (req, res) => {
  const { id } = req.params

  try {
    const customerExist = await findById("clientes", id)

    if (!customerExist) {
      return res.status(404).json({ message: "Cliente não encontrado." })
    }

    const costumer = await knex("clientes").where({ id }).first()

    return res.status(200).json(costumer)
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" })
  }
}

const customerUpdate = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body
  const { id } = req.params

  try {
    const validator = isNumber(cpf)

    if (!validator) {
      return res
        .status(400)
        .json({ message: "O campo CPF precisa ser um número" })
    }

    const customerExist = await knex("clientes").where({ id: id })

    if (customerExist.length === 0) {
      return res.status(404).json({ message: "Esse cliente não existe." })
    }

    const customerUpdated = await knex("clientes")
      .update({
        nome: nome.trim(),
        email: email.toLowerCase(),
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .where("id", id)

      .returning([
        "id",
        "nome",
        "email",
        "cpf",
        "cep",
        "rua",
        "numero",
        "bairro",
        "cidade",
        "estado",
      ])

    return res.status(200).json(customerUpdated)
  } catch (error) {
    const duplicateMail = "clientes_email_key"
    const duplicateCPF = "clientes_cpf_key"

    if (error.message.includes(duplicateMail)) {
      return res.status(400).json({ message: "E-mail já existe." })
    } else if (error.message.includes(duplicateCPF)) {
      return res.status(400).json({ message: "CPF já existe." })
    } else return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

module.exports = {
  listCustomers,
  datailCustomers,
  customerRegister,
  customerUpdate,
}
