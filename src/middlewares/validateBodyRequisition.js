const validateBodyRequisition = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = validateBodyRequisition;