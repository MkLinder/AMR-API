const database = require('../services/connection');

const listCategories = async (req, res) => {
  try {
    const categories = await database('categorias');

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = listCategories;
