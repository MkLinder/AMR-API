const database = require('../connection');
const formatCep = require('../utils/cepFormatter');
const { propertiesFormatter } = require('../utils/dataFormatter');
const paramIdValidator = require('../utils/paramIdValidator');

const registerCustomer = async (req, res) => {
  const { email, cpf, cep } = req.body;

  try {
    const customer = await database('clientes')
      .where({ email })
      .orWhere({ cpf });

    if (customer.length > 0) {
      return res
        .status(400)
        .json({ mensagem: 'Já existe email ou cpf cadastrado.' });
    }

    if (cep) {
      req.body.cep = formatCep(cep);
    }

    const { email: _, ...customerData } = req.body;

    const propertiesFormatted = propertiesFormatter(customerData);

    propertiesFormatted.email = email;

    const newCustomer = await database('clientes')
      .insert(propertiesFormatted)
      .returning('*');

    if (newCustomer.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: 'O cliente não foi cadastrado.' });
    }

    return res.status(201).json(newCustomer[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const editCustomerData = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ mensagem: 'Digite um id de cliente válido.' });
  }

  try {
    const idIsNotNumber = isNaN(Number(id));

    if (idIsNotNumber) {
      return paramIdValidator(
        res,
        'O identificador do cliente deve ser um número.'
      );
    }

    const customerExists = await database('clientes').where({ id }).first();

    if (!customerExists) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    const EmailCpfExists = await database('clientes')
      .where({ email })
      .orWhere({ cpf });

    if (EmailCpfExists.length > 0) {
      for (const item of EmailCpfExists) {
        if (item.id !== customerExists.id) {
          return res.status(400).json({ mensagem: 'Email ou cpf inválido.' });
        }
      }
    }

    if (cep) {
      req.body.cep = formatCep(cep);
    }

    const { email: _, ...customerData } = req.body;

    const propertiesFormatted = propertiesFormatter(customerData);

    propertiesFormatted.email = email;

    const newCustomer = await database('clientes')
      .where({ id })
      .update(propertiesFormatted);

    if (newCustomer.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: 'O cliente não foi cadastrado.' });
    }

    return res.status(200).json({ mensagem: 'Cadastro atualizado.' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const listCustomers = async (req, res) => {
  try {
    const customers = await database('clientes');

    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const getCustomerDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const idIsNotNumber = isNaN(Number(id));

    if (idIsNotNumber) {
      return paramIdValidator(
        res,
        'O identificador do cliente deve ser um número.'
      );
    }

    const existingCustomer = await database('clientes').where({ id }).first();

    if (!existingCustomer) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    return res.status(200).json(existingCustomer);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};
module.exports = {
  registerCustomer,
  editCustomerData,
  listCustomers,
  getCustomerDetails,
};
