const joiValidations = require('joi');

const loginSchema = joiValidations.object({
  email: joiValidations.string().email().required().messages({
    'any.required': 'O campo email é obrigatório.',
    'string.empty': 'O campo email é obrigatório.',
    'string.email': 'O campo email precisa ter um formato válido.',
  }),

  senha: joiValidations.string().min(6).required().messages({
    'any.required': 'O campo senha é obrigatório.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.min': 'A senha deve ter no mínimo 6 caracteres.',
  }),
});

module.exports = loginSchema;
