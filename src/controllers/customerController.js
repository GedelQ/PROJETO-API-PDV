const knex = require("../database/connection");

const listCustomers = async (req, res) => {
  try {
    const checkCostumer = await knex("clientes");
    if (!checkCostumer) {
      return res
        .status(404)
        .json({ message: "Sem clientes para serem listas." });
    }

    return res.status(200).json(checkCostumer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const datailCustomers = async (req, res) => {
  const { id } = req.params;

  try {
    const checkCostumer = await knex("clientes").where({ id }).first();
    if (!checkCostumer) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    return res.status(200).json(checkCostumer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  listCustomers,
  datailCustomers,
};
