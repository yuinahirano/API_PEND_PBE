import { Produtos } from "../models/Produtos";
import produtoRepository from "../repositories/produtoRepository";

const produtosController = {
    criar: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Verifique se a imagem foi enviada' });
            }
            const { nome, descricao, preco, qtdEstoque, idCategoria } = req.body;
            const vinculoImagem = `/uploads/imagens/${req.file.filename}`;
            const produto = Produtos.criar({ nome, descricao, preco, imagem: vinculoImagem, qtdEstoque, idCategoria });
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
}

export default produtosController;