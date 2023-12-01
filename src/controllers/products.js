const database = require('../connection');

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const existingCategory = await database('categorias')
      .where({ id: categoria_id })
      .first();

    if (!existingCategory) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }

    const productRegistration = await database('produtos')
      .where({ id: categoria_id })
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
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

const updateProductData = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const existingProduct = await database('produtos').where({ id }).first();

    if (!existingProduct) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    await database('produtos')
      .where({ id })
      .update({ descricao, quantidade_estoque, valor, categoria_id });

    return res.status(204).json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { registerProduct, updateProductData };
