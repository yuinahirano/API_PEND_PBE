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
    },


    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionar();
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const { status } = req.body;

            const statusValidos = Object.values(statusPedido);
            if (!statusValidos.includes(status)) {
                return res.status(400).json({
                    message: `Status inválido. Valores aceitos: ${statusValidos.join(', ')}`
                });
            }
 
            const result = await pedidoRepository.atualizarStatus(pedidoId, status);
 
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }
 
            return res.status(200).json({
                message: "Status do pedido atualizado com sucesso",
                novoStatus: status
            });
 
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