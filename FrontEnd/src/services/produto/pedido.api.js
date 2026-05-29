import axios from 'axios';

const API_URL = 'http://localhost:8000/pedidos';

export async function criarPedido(idCliente, itens) {
  try {
    const resposta = await axios.post(API_URL, { idCliente, itens });
    console.log('resposta.data:', resposta.data);
    return resposta.data.rowsPedido;
  } catch (erro) {
    console.error('Erro ao criar pedido', erro);
    return null;
  }
}
