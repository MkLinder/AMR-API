const paramIdValidator = (res, message) =>
  res.status(400).json({
    mensagem: message,
  });

module.exports = paramIdValidator;
