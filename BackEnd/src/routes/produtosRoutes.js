import { Router } from "express";
import produtosController from "../controllers/produtosController.js";
import uploadImage from "../middleware/uploadImagem.middleware.js";

const produtoRoutes = Router();

produtoRoutes.post('/', uploadImage, produtosController.criar);

export default produtoRoutes;