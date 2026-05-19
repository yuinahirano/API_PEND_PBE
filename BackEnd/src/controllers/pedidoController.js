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
    },
    adicionarItem: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const { idProduto, quantidade, valorItem } = req.body;
 
            // valida via model já associando o idPedido
            const item = ItensPedido.criarComPedido({
                idProduto,
                quantidade,
                valorItem,
                idPedido: pedidoId
            });
 
            const result = await pedidoRepository.adicionarItem({
                idPedido: item.idPedido,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                valorItem: item.valorItem
            });
 
            return res.status(201).json({
                message: "Item adicionado ao pedido com sucesso",
                novoSubTotal: result.novoSubTotal,
                result: result.rowsItem
            });
 
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    editarItem: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const itemId = Number(req.params.itemId);
            const { quantidade } = req.body;
 
            if (!quantidade || quantidade <= 0) {
                return res.status(400).json({ message: "Informe uma quantidade válida (> 0)" });
            }
 
            const result = await pedidoRepository.editarItem(itemId, pedidoId, quantidade);
 
            return res.status(200).json({
                message: "Item atualizado com sucesso",
                novoSubTotal: result.novoSubTotal
            });
 
        } catch (error) {
            console.log(error);
            const httpStatus = error.message.includes('não encontrado') ? 404 : 500;
            return res.status(httpStatus).json({
                message: error.message.includes('não encontrado')
                    ? error.message
                    : "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },
};

export default pedidoController;