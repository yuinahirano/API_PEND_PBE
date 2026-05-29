import axios from 'axios';

const API_URL = 'http://localhost:8000/pedidos';

export async function buscarPedidos() {
  try {
    const resposta = await axios.get(API_URL);
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar pedidos', erro);
    return [];
  }
}

export async function atualizarStatusPedido(idPedido, status) {
  try {
    const resposta = await axios.put(`${API_URL}/${idPedido}/status`, { status });
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao atualizar status do pedido', erro);
    return null;
  }
}

export async function deletarPedido(idPedido) {
  try {
    const resposta = await axios.delete(`${API_URL}/${idPedido}`);
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao deletar pedido', erro);
    return null;
  }
}