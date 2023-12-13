const database = require('../services/connection');
const { uploadImage } = require('../services/uploads');
const { nameFormatter } = require('../utils/dataFormatter');

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const existingCategory = await database('categorias')
      .where({ id: categoria_id })
      .first();

    if (!existingCategory) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }

    const existingNameProduct = await database('produtos')
      .where({ descricao: nameFormatter(descricao) })
      .first();

    if (existingNameProduct) {
      return res.status(400).json({ mensagem: 'Produto já cadastrado.' });
    }

    let productRegistration = await database('produtos')
      .where({ id: categoria_id })
      .insert({
        descricao: nameFormatter(descricao),
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning('*');

    if (!productRegistration) {
      return res
        .status(500)
        .json({ mensagem: 'Erro do servidor. Produto não foi cadastrado.' });
    }

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;

      const id = productRegistration[0].id;

      const image = await uploadImage(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      );

      productRegistration = await database('produtos')
        .update({ produto_imagem: image.url })
        .where({ id })
        .returning('*');
    }

    return res.status(201).json(productRegistration[0]);
  } catch (error) {
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

    const existingCategory = await database('categorias')
      .where({ id: categoria_id })
      .first();

    if (!existingCategory) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }

    const existingNameProduct = await database('produtos')
      .where({ descricao: nameFormatter(descricao) })
      .first();

    if (existingNameProduct && existingProduct.id !== Number(id)) {
      return res.status(400).json({ mensagem: 'Produto já cadastrado.' });
    } 

    if(req.file) {
      const { originalname, mimetype, buffer } = req.file;

      const id = existingProduct.id

      const image = await uploadImage(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      );

      await database('produtos')
        .where({ id })
        .update({
          descricao: nameFormatter(descricao),
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: image.url
        })
    }

    await database('produtos')
      .where({ id })
      .update({
        descricao: nameFormatter(descricao),
        quantidade_estoque,
        valor,
        categoria_id,
      });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const listProducts = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const categoryExists = await database('categorias')
        .where({ id: categoria_id })
        .first();

      if (!categoryExists) {
        return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
      }

      return res
        .status(200)
        .json(await database('produtos').where({ categoria_id }));
    }

    return res.status(200).json(await database('produtos'));
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const productInformation = async (req, res) => {
  const { id } = req.params;

  try {
    const productExists = await database('produtos').where({ id }).first();

    if (!productExists) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    return res.status(200).json(productExists);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await database('produtos').where({ id: productId });

    const orderedProduct = await database('pedido_produtos')
      .where({
        produto_id: productId,
      })
      .first();

    if (orderedProduct) {
      return res.status(400).json({
        mensagem:
          'O produto não pode ser excluído, pois está vinculado a um pedido.',
      });
    }

    if (product.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    const excludedProduct = await database('produtos')
      .del()
      .where({ id: productId });

    if (excludedProduct === 0) {
      return res.status(400).json({ mensagem: 'O produto não foi excluido.' });
    }

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = {
  registerProduct,
  updateProductData,
  listProducts,
  productInformation,
  deleteProduct,
};
