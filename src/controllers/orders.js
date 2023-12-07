const database = require('../connection');

const registerOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const customerExists = await database('clientes')
      .where({ id: cliente_id })
      .debug();

    if (customerExists.length === 0) {
      return res.status(400).json({ mensagem: 'Cliente não encontrado.' });
    }

    return res.json(customerExists);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { registerOrder };
