// Salva um personagem na lista de favoritos
export function salvarFavorito(personagem) {
  const favoritos = JSON.parse(
    localStorage.getItem('favoritos') || '[]'
  );

  // evita duplicados
  const jaExiste = favoritos.some(
    fav => fav.name === personagem.name
  );

  if (!jaExiste) {
    favoritos.push(personagem);

    localStorage.setItem(
      'favoritos',
      JSON.stringify(favoritos)
    );
  }
}

// Remove um personagem da lista de favoritos pelo id
export function removerFavorito(personagem) {
  const favoritos = JSON.parse(
    localStorage.getItem('favoritos') || '[]'
  );

  const favoritosAtualizados = favoritos.filter(
    fav => fav.name !== personagem.name
  );

  localStorage.setItem(
    'favoritos',
    JSON.stringify(favoritosAtualizados)
  );
}

// Retorna todos os personagens salvos como favoritos
export function listarFavoritos() {
  return JSON.parse(
    localStorage.getItem('favoritos') || '[]'
  );
}

// Verifica se um personagem já é favorito
export function ehFavorito(personagem) {
  const favoritos = JSON.parse(
    localStorage.getItem('favoritos') || '[]'
  );

  return favoritos.some(
    fav => fav.name === personagem.name
  );
}