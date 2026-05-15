import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";
import connection from "../config/database.js"; 

const categoriaController = {

    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;
            const categoria = Categoria.criar({ nome, descricao });
            const result = await categoriaRepository.criar(categoria);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, descricao } = req.body;

            const categoria = Categoria.alterar({ nome, descricao }, id);
            const result = await categoriaRepository.editar(categoria);

            res.status(200).json({
                message: "Categoria atualizada com sucesso",
                result
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await categoriaRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await categoriaRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const id = req.params.id;

            const sql = "SELECT * FROM categorias WHERE id = ?";
            const [rows] = await connection.execute(sql, [id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            res.status(200).json({ result: rows[0] });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    }
};

export default categoriaController;