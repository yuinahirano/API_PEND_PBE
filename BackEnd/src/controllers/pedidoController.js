import { statusPedido } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

// controlador responsável pelas operações de pedidos
const pedidoController = {

    // cria um novo pedido
    criar: async (req, res) => {
        try {
            // recebe os dados enviados no corpo da requisição
            const { idCliente, itens } = req.body;

            // transforma os itens recebidos em objetos válidos
            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    idProduto: item.idProduto,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            // calcula o subtotal de todos os itens
            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);

            // cria o pedido com status inicial aberto
            const pedido = Pedido.criar({
                idCliente,
                subTotal,
                status: statusPedido.ABERTO
            });

            // salva o pedido no banco
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

    // lista todos os pedidos
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

    // atualiza o status de um pedido
    atualizarStatus: async (req, res) => {
        try {
            // pega o id do pedido pela rota
            const pedidoId = Number(req.params.pedidoId);

            // pega o novo status enviado
            const { status } = req.body;

            // valida se o status existe
            const statusValidos = Object.values(statusPedido);

            if (!statusValidos.includes(status)) {
                return res.status(400).json({
                    message: `Status inválido. Valores aceitos: ${statusValidos.join(', ')}`
                });
            }

            // atualiza no banco
            const result = await pedidoRepository.atualizarStatus(pedidoId, status);

            // verifica se o pedido existe
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Pedido não encontrado"
                });
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

    // adiciona um item ao pedido
    adicionarItem: async (req, res) => {
        try {
            // pega o id do pedido
            const pedidoId = Number(req.params.pedidoId);

            // recebe os dados do item
            const { idProduto, quantidade, valorItem } = req.body;

            // cria e valida o item
            const item = ItensPedido.criarComPedido({
                idProduto,
                quantidade,
                valorItem,
                idPedido: pedidoId
            });

            // salva o item no banco
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

    // edita a quantidade de um item
    editarItem: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const itemId = Number(req.params.itemId);

            const { quantidade } = req.body;

            // valida a quantidade
            if (!quantidade || quantidade <= 0) {
                return res.status(400).json({
                    message: "Informe uma quantidade válida (> 0)"
                });
            }

            // atualiza o item
            const result = await pedidoRepository.editarItem(itemId, pedidoId, quantidade);

            return res.status(200).json({
                message: "Item atualizado com sucesso",
                novoSubTotal: result.novoSubTotal
            });

        } catch (error) {
            console.log(error);

            // define o status da resposta
            const status = error.message.includes('não encontrado') ? 404 : 500;

            return res.status(status).json({
                message: error.message.includes('não encontrado')
                    ? error.message
                    : "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    // remove um item do pedido
    excluirItem: async (req, res) => {
        try {
            // pega os ids da rota
            const pedidoId = Number(req.params.pedidoId);
            const itemId = Number(req.params.itemId);

            // exclui o item
            const result = await pedidoRepository.excluirItem(itemId, pedidoId);

            return res.status(200).json({
                message: "Item excluído com sucesso",
                novoSubTotal: result.novoSubTotal
            });

        } catch (error) {
            console.log(error);

            // define o status da resposta
            const httpStatus = error.message.includes('não encontrado') ? 404 : 500;

            return res.status(httpStatus).json({
                message: error.message.includes('não encontrado')
                    ? error.message
                    : "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    }
};

// exporta o controlador
export default pedidoController;