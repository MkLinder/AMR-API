const database = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nameFormatter = require('../utils/nameFormatter');

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const user = await database('usuarios').where({ email }).first();

    if (user) {
      return res.status(400).json({ mensagem: 'Email ou senha inválido.' });
    }

    const cryptedPass = await bcrypt.hash(senha, 10);

    const { rowCount } = await database('usuarios').insert({
      nome: nameFormatter(nome),
      email,
      senha: cryptedPass,
    });

    if (rowCount === 0) {
      return res
        .status(500)
        .json({ mensagem: 'Erro do servidor. Usuário não foi cadastrado.' });
    }

    return res
      .status(201)
      .json({ mensagem: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await database('usuarios').where({ email });

    if (user.length === 0) {
      return res.status(404).json('O usuario não foi encontrado');
    }

    const correctPassword = await bcrypt.compare(senha, user[0].senha);

    if (!correctPassword) {
      return res.status(400).json('Email e senha não confere');
    }

    const token = jwt.sign({ id: user[0].id }, process.env.HASH_PASS, {
      expiresIn: '1d',
    });

    const { senha: _, ...loggedInUser } = user[0];

    return res.status(201).json({
      user: loggedInUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const getUserDetails = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await database('usuarios').where({ id }).first();

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const { senha: _, ...userLoggedIn } = user;

    return res.status(200).json(userLoggedIn);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const updateUserData = async (req, res) => {
  const { nome, email, senha } = req.body;
  const user = req.user;

  try {
    const emailExists = await database('usuarios').where({ email }).first();

    if (emailExists.email && emailExists.email !== user.email) {

      return res.status(400).json({ mensagem: 'Email ou senha inválido.' });
    }

    const cryptedPass = await bcrypt.hash(senha, 10);

    await database('usuarios')
      .where({ id: user.id })
      .update({ nome: nameFormatter(nome), email, senha: cryptedPass });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json('Erro interno do servidor');
  }
};

module.exports = {
  registerUser,
  login,
  updateUserData,
  getUserDetails,
};
