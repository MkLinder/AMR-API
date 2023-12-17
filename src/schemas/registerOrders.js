const joiValidations = require('joi');

const productSchema = joiValidations
  .object({
    produto_id: joiValidations.number().required().integer().positive().messages({
      'any.required': 'O campo produto_id é obrigatório.',
      'number.base': 'O campo produto_id precisa ser um número.',
      'number.integer':
        'O campo produto_id precisa ser um número inteiro.',
      'number.positive':
        'O campo produto_id precisa ser um número positivo.',
    }),
    quantidade_produto: joiValidations.number().required().integer().positive().messages({
      'any.required': 'O campo quantidade_produto é obrigatório.',
      'number.base': 'O campo quantidade_produto precisa ser um número.',
      'number.integer':
        'O campo quantidade_produto precisa ser um número inteiro.',
      'number.positive':
        'O campo quantidade_produto precisa ser um número positivo.',
    }),
  })
  .min(1);

const schemaOrders = joiValidations
  .object({
    cliente_id: joiValidations.number().required().messages({
      'any.required': 'O campo client_id é obrigatório.',
      'string.empty': 'O campo cliente_id é obrigatório.',
      'number.base': 'O campo cliente_id precisa ser um número.',
    }),

    pedido_produtos: joiValidations
      .array()
      .items(productSchema)
      .min(1)
      .required()
      .messages({
        'any.required': 'O campo pedido_produtos é obrigatório.',
        'string.empty': 'O campo pedido_produtos é obrigatório.',
        'array.includes':
          'O valor dentro do pedido_produtos precisa ser um objeto',
        'array.base': 'O campo pedidos_produtos precisa ser um array',
        'array.min': 'Pelo menos um produto precisa ser especificado.',
      }),
  })
  .unknown(true);

module.exports = schemaOrders;
