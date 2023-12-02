const formatCpf = require('../utils/cpfFormatter');

const validateBodyRequisition = (schema) => async (req, res, next) => {
  const { cpf } = req.body;
  let body = req.body;

  if (cpf) {
    if (cpf.length !== 11 && cpf.length !== 14) {
      return res
        .status(400)
        .json({ mensagem: 'O cpf informado precisa ter onze números.' });
    }

    body.cpf = formatCpf(cpf);
  }

  try {
    await schema.validateAsync(body);

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validateBodyRequisition;
