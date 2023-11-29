const database = require('../connection');

const listCategories = async (req, res) => {
  try {
    const categories = await database('categorias');

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = listCategories;
