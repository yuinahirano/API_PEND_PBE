import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRouter = Router();

//rotas dw pedidos
pedidoRouter.get("/", pedidoController.selecionar);              
pedidoRouter.post("/", pedidoController.criar);                
pedidoRouter.put("/:pedidoId/status", pedidoController.atualizarStatus); 

// rotas de  itens
pedidoRouter.post("/:pedidoId/itens", pedidoController.adicionarItem);           
pedidoRouter.put("/:pedidoId/itens/:itemId", pedidoController.editarItem);        
pedidoRouter.delete("/:pedidoId/itens/:itemId", pedidoController.excluirItem);
pedidoRouter.delete("/:pedidoId", pedidoController.excluirPedido);
export default pedidoRouter;