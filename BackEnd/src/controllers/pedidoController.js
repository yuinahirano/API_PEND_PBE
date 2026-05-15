import { statusPedido } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

const pedidoController = {

    criar: async (req, res) => {
        try {
            const { idCliente, itens } = req.body;

            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    idProduto: item.idProduto,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );


            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);

            const pedido = Pedido.criar({
                idCliente,
                subTotal,
                status: statusPedido.ABERTO
            });

            const result = await pedidoRepository.criar(pedido, itensPedido);
            return res.status(201).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    }
};

export default pedidoController;