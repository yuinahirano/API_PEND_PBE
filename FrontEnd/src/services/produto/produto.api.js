import axios from 'axios';

// URL base da API de produtos
const API_URL = 'http://localhost:8000/produtos';

// Busca a lista de produtos na API
export async function buscarProdutos() {
  try {
    const resposta = await axios.get(API_URL);
return resposta.data.result;

  } catch (erro) {
    // Trata erro de requisição e evita quebrar a aplicação
    console.error('Erro ao buscar produtos', erro);
    return [];
  }
}