const joiValidations = require('joi');

const schemaCustomers = joiValidations.object({
  nome: joiValidations.string().required().messages({
    'any.required': 'O campo nome é obrigatório.',
    'string.empty': 'O campo nome é obrigatório.',
  }),

  email: joiValidations.string().email().required().messages({
    'any.required': 'O campo email é obrigatório.',
    'string.empty': 'O campo email é obrigatório.',
    'string.email': 'O campo email precisa ter um formato válido.',
  }),

  cpf: joiValidations
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      'any.required': 'O campo CPF é obrigatório.',
      'string.empty': 'O campo CPF é obrigatório.',
      'string.pattern.base': 'O CPF deve ser um número válido.',
    }),
});

module.exports = schemaCustomers;
