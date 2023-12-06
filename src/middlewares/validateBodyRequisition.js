const formatCep = require('../utils/cepFormatter');
const formatCpf = require('../utils/cpfFormatter');

const validateBodyRequisition = (schema) => async (req, res, next) => {
  const { cpf, cep } = req.body;
  let body = {};

  if (cpf) {
    if (cpf.length !== 11 && cpf.length !== 14) {
      return res
        .status(400)
        .json({ mensagem: 'O cpf informado precisa ter onze números.' });
    }

    req.body.cpf = formatCpf(cpf);
  }

  if (cep) {
    const { nome, email, cpf, cep } = req.body;

    (body.nome = nome),
      (body.email = email),
      (body.cpf = formatCpf(cpf)),
      (body.cep = formatCep(cep));
  }

  try {
    const information = JSON.stringify(body) === '{}' ? req.body : body;

    await schema.validateAsync(information);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validateBodyRequisition;
