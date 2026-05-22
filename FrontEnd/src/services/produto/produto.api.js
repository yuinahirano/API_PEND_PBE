import axios from 'axios';

// URL base da API de personagens
const API_URL = 'https://hp-api.onrender.com/api/characters';

// Busca a lista de personagens na API
export async function buscarPersonagens() {
  try {
    const resposta = await axios.get(API_URL);
    return resposta.data;

  } catch (erro) {
    // Trata erro de requisição e evita quebrar a aplicação
    console.error('Erro ao buscar personagens', erro);
    return [];
  }
}