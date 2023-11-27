const database = require('../connection');
const bcrypt = require('bcrypt');
const nameFormatter = require('../utils/nameFormatter');

const registerUser = async (req, res) => {
    let { nome } = req.body;
    const { email, senha } = req.body;

    try {
        const user = await database('usuarios')
            .where({ email }).first().debug();

        if (user) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido.' });
        }

        nome = nameFormatter(nome);

        const cryptedPass = await bcrypt.hash(senha, 10);

        const { rowCount } = await database('usuarios').insert({ nome, email, senha: cryptedPass });

        if (rowCount === 0) {
            return res.status(500).json({ mensagem: 'Erro do servidor. Usuario não foi cadastrado.' });
        }

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    registerUser
}