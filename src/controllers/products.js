const database = require('../connection');

const registerProduct = async (req, res) => {
    const { id } = req.user;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  
    try {
        const existingCategory = await database('categorias')
        .where({ id: categoria_id })
        .first();
  
        if (!existingCategory) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }
  
        const productRegistration = await database('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
            id,
        });
  
        if (!productRegistration) {
            return res
            .status(500)
            .json({ mensagem: 'Erro do servidor. Produto não foi cadastrado.' });
        }
  
        return res
        .status(201)
        .json({ mensagem: 'Produto cadastrado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};


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

const productInformation = async (req, res) => {
    const {id} = req.params;

    try {
        const productExists = await database('produtos').where({id}).first();

        if (!productExists){
            return res.status(404).json({mensagem: 'Produto não encontrado.'});
        }
    
        return res.status(200).json(productExists);
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor.'});
    }
}

module.exports = {
    registerProduct,
    listProducts,
    productInformation
}
