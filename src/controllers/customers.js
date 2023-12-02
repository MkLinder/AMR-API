const database = require("../connection");

const registerCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;

  try {
    const customer = await database('clientes').where({email}).orWhere({cpf}).debug(); 
    
    return res.json(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  registerCustomer
}