const knex = require("../database/connection")
const isNumber = require("../services/validatorService")
const validatorService = require("../services/validatorService")

const customerRegister = async (req, res) => {
  const { nome, email, cpf } = req.body

  try {
    const validator = isNumber(cpf)

    if (!validator) {
      return res
        .status(400)
        .json({ message: "O campo CPF precisa ser um número" })
    }

    const customer = await knex("clientes")
      .insert({ nome: nome.trim(), email: email.toLowerCase(), cpf })
      .returning(["id", "nome", "email", "cpf"])

    if (!customer) {
      return res.status(400).json({ message: "O cliente não foi cadastrado." })
    }

    return res.status(201).json(customer)
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
    if (!checkCostumer) {
      return res
        .status(404)
        .json({ message: "Sem clientes para serem listas." })
    }

    return res.status(200).json(checkCostumer)
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." })
  }
}

const datailCustomers = async (req, res) => {
  const { id } = req.params

  try {
    const verifyIdNumber = validatorService(id)
    if (!verifyIdNumber) {
      return res.status(404).json({
        message: "ID inválido, verifique se foi utilizado números inteiros.",
      })
    }
    const checkCostumer = await knex("clientes").where({ id }).first()
    if (!checkCostumer) {
      return res.status(404).json({ message: "Cliente não encontrado." })
    }

    return res.status(200).json(checkCostumer)
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" })
  }
}

const customerUpdate = async (req, res) => {
  const { nome, email, cpf } = req.body
  const { id } = req.params

  try {
    const customerExist = await knex("clientes").where({ id: id })
    if (customerExist.length === 0) {
      return res.status(404).json({ message: "Esse cliente não existe." })
    }

    const customerUpdated = await knex("clientes")
      .update({
        nome: nome.trim(),
        email: email.toLowerCase(),
        cpf,
      })
      .where("id", id)
      .returning(["id", "nome", "email", "cpf"])

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
