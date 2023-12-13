const joiValidations = require('joi');

const schemaProducts = joiValidations.object({
  descricao: joiValidations.string().required().messages({
    'any.required': 'O campo descrição é obrigatório.',
    'string.empty': 'O campo descrição é obrigatório.',
  }),

  quantidade_estoque: joiValidations
    .number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'O campo quantidade_estoque é obrigatório.',
      'number.base': 'O campo quantidade_estoque precisa ser um número.',
      'number.integer':
        'O campo quantidade_estoque precisa ser um número inteiro.',
      'number.positive':
        'O campo quantidade_estoque precisa ser um número positivo.',
    }),

  valor: joiValidations.number().integer().positive().required().messages({
    'any.required': 'O campo valor é obrigatório.',
    'number.base': 'O campo valor precisa ser um número.',
    'number.integer': 'O campo valor precisa ser um número inteiro.',
    'number.positive': 'O campo valor precisa ser um número positivo.',
  }),

  categoria_id: joiValidations
    .number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'O campo categoria_id é obrigatório.',
      'number.base': 'O campo categoria_id precisa ser um número.',
      'number.integer': 'O campo categoria_id precisa ser um número inteiro.',
      'number.positive': 'O campo categoria_id precisa ser um número positivo.',
    }),
}).unknown(true);

module.exports = schemaProducts;
