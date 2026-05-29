// Salva um personagem na lista de carrinho
export function salvarCarrinho(personagem) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const jaExiste = carrinho.some(item => item.id === personagem.id);

  if (!jaExiste) {
    carrinho.push(personagem);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}

// Remove um personagem do carrinho pelo id
export function removerCarrinho(personagem) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const carrinhoAtualizado = carrinho.filter(item => item.id !== personagem.id);

  localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
}

// Retorna todos os personagens salvos no carrinho
export function listarCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho') || '[]');
}

// Verifica se um personagem já está no carrinho
export function estaCarrinho(personagem) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  return carrinho.some(item => item.id === personagem.id);
}