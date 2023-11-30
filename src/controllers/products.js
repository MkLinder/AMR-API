const database = require('../connection');

const listProducts = async (req, res) => {
    const {categoria_id} = req.query;
    
    try {
        if (categoria_id){
            const categoryExists = await database('categorias').where({id: categoria_id}).first();
            
            if (!categoryExists){
                return res.status(400).json({mensagem: 'Categoria não encontrada.'});
            }

            return res.status(200).json(await database('produtos').where({categoria_id}));
        }

        return res.status(200).json(await database('produtos'));
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor.'});
    }
}

module.exports = {
    listProducts
}