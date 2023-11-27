const knex = require("../database/connection");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
	const { nome, email, senha } = req.body;
	let showStatus = 400;
	let showResult = {
		message: `Campos nome, email e senha são obrigatórios.`
	};

	if (!nome) {
		return res.status(showStatus).json(showResult);
	}
	if (!email) {
		return res.status(showStatus).json(showResult);
	}
	if (!senha) {
		return res.status(showStatus).json(showResult);
	}

	try {
		const checkUser = await knex("usuarios").where({ email });
		if (checkUser.length > 0) {
			return res.status(showStatus).json({ message: "E-mail já existe." });
		}

		const encryptedPassword = await bcrypt.hash(senha, 10);

		const user = await knex("usuarios").insert({ nome, email, senha: encryptedPassword }).returning("*");

		if (!user) {
			return res.status(400).json({ message: "O usuário não foi cadastrado." });
		}

		return res.status(201).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: "Erro interno do servidor." });
	}
};

const userDetail = async (req, res) => {
  const user = req.user

  return res.status(200).json(user)
}


const userUpdate = async (req, res) => {
	const { nome, email, senha } = req.body;
	const { id } = req.user;

	try {
		const checkUser = await knex("usuarios").where({ email });
		if (checkUser.length > 0) {
			return res.status(showStatus).json({ message: "E-mail já existe." });
		}

		const encryptedPassword = await bcrypt.hash(senha, 10);

		await knex("usuarios")
			.update({
				nome,
				email,
				senha: encryptedPassword
			})
			.returning("*");

		return res.status(204).send();
	} catch (error) {
		return res.status(500).json("Erro interno do servidor");
	}
};

module.exports = {
	userRegister,
	userDetail,
	userUpdate
};
