const database = require('../connection');

const registerProduct = async (req, res) => {
  const { id } = req.user;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const existingCategory = await database('categorias')
      .where({ id: categoria_id })
      .first();

    if (!existingCategory) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }

    const productRegistration = await database('produtos').insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      id,
    });

    if (!productRegistration) {
      return res
        .status(500)
        .json({ mensagem: 'Erro do servidor. Produto não foi cadastrado.' });
    }

    return res
      .status(201)
      .json({ mensagem: 'Produto cadastrado com sucesso.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { registerProduct };
