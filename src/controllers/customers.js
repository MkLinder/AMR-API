const database = require("../connection");
const nameFormatter = require("../utils/nameFormatter");
const cpfFormatter = require("../utils/cpfFormatter");

const registerCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;

  try {
    const customer = await database("clientes")
      .where({ email })
      .orWhere({ cpf })
      .debug();

    return res.json(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const editCustomerData = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ mensagem: "Digite um id de cliente válido." });
  }

  try {
    const customerExists = await database("clientes").where({ id }).first();

    if (!customerExists) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    await database("clientes")
      .where({ id })
      .update({ nome: nameFormatter(nome), email, cpf: cpfFormatter(cpf) });

    return res.status();
  } catch (error) {}
};

module.exports = {
  registerCustomer,
  editCustomerData,
};
