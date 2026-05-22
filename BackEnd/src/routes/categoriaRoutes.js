import {Router} from "express";
import categoriaController from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.post('/', categoriaController.criar);
categoriaRoutes.put('/:id', categoriaController.editar);
categoriaRoutes.delete('/:id', categoriaController.deletar);
categoriaRoutes.get('/', categoriaController.selecionar);
categoriaRoutes.get('/categorias/:id', categoriaController.buscarPorId);

export default categoriaRoutes;