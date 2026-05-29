import { Produtos } from "../models/Produtos.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtosController = {
    criar: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Verifique se a imagem foi enviada' });
            }
            const { nome, descricao, preco, qtdEstoque, idCategoria } = req.body;
            const vinculoImagem = `/uploads/imagens/${req.file.filename}`;
            const produto = Produtos.criar({ nome, descricao, preco, vinculoImagem, qtdEstoque, idCategoria });
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
selecionar: async (req, res) => {
    try {
        const id = req.params.id;

        let result;

        if (id) {
            result = await produtoRepository.selecionarPorId(id);
        } else {
            result = await produtoRepository.selecionarTodos();
        }

        return res.status(200).json({ result });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
        });
    }
},
    selecionarEstoque: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.selecionarEstoque(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
editar: async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, descricao, preco, qtdEstoque, idCategoria, vinculoImagemAtual } = req.body;

        let vinculoImagem = vinculoImagemAtual; 

        if (req.file) {
            vinculoImagem = `/uploads/imagens/${req.file.filename}`;
        }

        const produto = {
            id,
            nome,
            descricao,
            preco,
            vinculoImagem,
            qtdEstoque,
            idCategoria
        };

        const result = await produtoRepository.editar(produto);

        return res.status(200).json({
            message: 'Produto atualizado com sucesso',
            result
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
        });
    }
},

        deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            return res.status(200).json({ result });
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