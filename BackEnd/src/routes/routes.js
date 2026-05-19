import { Router } from "express";
const routes = Router()
import produtoRoutes from "./produtosRoutes.js";

routes.use('/produtos', produtoRoutes)

export default routes;
