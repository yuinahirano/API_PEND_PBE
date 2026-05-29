const API_URL = 'http://localhost:8000/categorias';

// Busca o nome de uma categoria pelo seu ID
export async function buscarNomeCategoria(idCategoria) {
  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    const categorias = dados.result;

    // String() em ambos evita erro de tipo (número vs string)
    const categoriaEncontrada = categorias.find(
      categoria => String(categoria.id) === String(idCategoria)
    );

    return categoriaEncontrada ? categoriaEncontrada.nome : 'Sem categoria';

  } catch (erro) {
    // Retorna texto padrão para não quebrar o card
    console.error('Erro ao buscar categoria', erro);
    return 'Sem categoria';
  }
}