import { Router } from "express";
const routes = Router();
import produtoRoutes from "./produtosRoutes.js";
import pedidoRoutes from "./pedido.routes.js";
import categoriaRoutes from "./categoriaRoutes.js";

routes.use('/produtos', produtoRoutes)
routes.use('/pedidos', pedidoRoutes);
routes.use('/categorias', categoriaRoutes);

export default routes;
