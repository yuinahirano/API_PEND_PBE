import { Router } from "express";
import produtosController from "../controllers/produtosController.js";
import uploadImage from "../middleware/uploadImagem.middleware.js";

const produtoRoutes = Router();

produtoRoutes.post('/', uploadImage, produtosController.criar);

produtoRoutes.get('/', produtosController.selecionar);

produtoRoutes.get('/:id', produtosController.selecionar);

produtoRoutes.get('/estoque/:id', produtosController.selecionarEstoque);

produtoRoutes.put('/:id', uploadImage, produtosController.editar);

produtoRoutes.delete('/:id', produtosController.deletar);

export default produtoRoutes;