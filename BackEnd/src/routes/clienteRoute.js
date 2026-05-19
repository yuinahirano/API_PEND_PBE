import {Router} from 'express';
import clienteController from '../controllers/clienteController.js';

const clienteRoutes = Router();

clienteRoutes.post('/', clienteController.create);
clienteRoutes.get('/', clienteController.selecionar);
clienteRoutes.put('/:id', clienteController.atualizar);

export default clienteRoutes;