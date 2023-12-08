const database = require('../connection');

const registerOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const customerExists = await database('clientes')
      .where({ id: cliente_id });

    if (customerExists.length === 0) {
      return res.status(400).json({ mensagem: 'Cliente não encontrado.' });
    }

    const products = []
    
    for (const order of pedido_produtos) {
      const { produto_id, quantidade_produto } = order;
      
      const productExists = await database('produtos').where({id: produto_id}).first();
      
      if (productExists) {
        products.push(productExists);
      }

      if (productExists && quantidade_produto > productExists.quantidade_estoque) {
        return res.status(200).json({ mensagem: `Produto ID ${produto_id}: Estoque insuficiente.`});
      } else if (!productExists) {
        return res.status(200).json({ mensagem: `Produto ID ${produto_id}: Produto não encontrado.`});
      } 
      
    }
    
    if(products.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum produto foi encontrado.' })
    }

    
    // await database('pedidos').insert(products);



    return res.json(products);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const listOrders = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const customerExists = await database('clientes')
        .where({ id: cliente_id })
        .first();

      if (!customerExists) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }

      return res
        .status(200)
        .json(await database('pedidos').where({ cliente_id }));
    }

    return res.status(200).json(await database('pedidos'));
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};
module.exports = {
  registerOrder,
  listOrders,
};
