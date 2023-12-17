const jwt = require("jsonwebtoken");
const database = require('../services/connection');

const userAuthentication = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }
    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, process.env.HASH_PASS);

        const user = await database('usuarios')
            .where({ id })
            .first();

        if (!user) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Não autorizado' });
    }
};

module.exports = userAuthentication;