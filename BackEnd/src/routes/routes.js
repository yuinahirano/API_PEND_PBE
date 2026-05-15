import { Router } from "express";
import pedidoRoutes from "./pedido.routes.js";

const routes = Router();
routes.use('/pedidos', pedidoRoutes);

export default routes;