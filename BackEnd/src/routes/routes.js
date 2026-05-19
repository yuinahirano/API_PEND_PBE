import { Router } from "express";
import categoriaRoutes from "./categoriaRoutes.js";

const routes = Router();

routes.use('/categorias', categoriaRoutes);


export default routes;