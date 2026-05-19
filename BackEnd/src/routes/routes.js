import { Router } from "express";
const routes = Router();
import produtoRoutes from "./produtosRoutes.js";
import pedidoRoutes from "./pedido.routes.js";

routes.use('/produtos', produtoRoutes)
routes.use('/pedidos', pedidoRoutes);

export default routes;
