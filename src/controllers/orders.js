const database = require('../services/connection');
const send = require('../services/nodemailer');
const compiladorHtml = require('../utils/compiladorHtml');

const registerOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const customerExists = await database('clientes').where({ id: cliente_id });

    if (customerExists.length === 0) {
      return res.status(400).json({ mensagem: 'Cliente não encontrado.' });
    }

    const products = [];

    for (const order of pedido_produtos) {
      const { produto_id, quantidade_produto } = order;

      const productExists = await database('produtos')
        .where({ id: produto_id })
        .first();

      if (productExists) {
        products.push(productExists);
      }

      if (
        productExists &&
        quantidade_produto > productExists.quantidade_estoque
      ) {
        return res.status(200).json({
          mensagem: `Produto ID ${produto_id}: Estoque insuficiente.`,
        });
      } else if (!productExists) {
        return res.status(200).json({
          mensagem: `Produto ID ${produto_id}: Produto não encontrado.`,
        });
      }
      await database('produtos')
        .where({ id: produto_id })
        .decrement('quantidade_estoque', quantidade_produto);
    }

    if (products.length === 0) {
      return res
        .status(404)
        .json({ mensagem: 'Nenhum produto foi encontrado.' });
    }

    // ----  ATUALIZAÇÕES --------------------------------------------------------------
    const carrinhoPedido = await database('pedidos')
      .insert({
        cliente_id,
        observacao,
      })
      .returning('id');

    let valor_total = 0;
    for (let produto of pedido_produtos) {
      const { produto_id, quantidade_produto } = produto;
      const { valor: valor_produto } = await database('produtos')
        .where({
          id: produto_id,
        })
        .first();

      await database('pedido_produtos').insert({
        pedido_id: carrinhoPedido[0].id,
        produto_id,
        quantidade_produto,
        valor_produto,
      });

      valor_total += valor_produto * quantidade_produto;
    }
    await database('pedidos')
      .update({ valor_total })
      .where({ id: carrinhoPedido[0].id });

    // -----------------------------------------------------------------------------------

    const customerData = await database('clientes')
      .where({ id: cliente_id })
      .select('email', 'nome')
      .first();
    const subject = 'Cadastro de pedidos';
    const html = await compiladorHtml('./src/templates/orders.html', {
      customerName: customerData.nome,
    });

    send(customerData, subject, html);

    return res.json({
      pedido_id: carrinhoPedido[0].id,
      cliente_id,
      valor_total,
      pedido_produtos,
    });
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
