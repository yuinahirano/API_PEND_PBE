// Salva um personagem na lista de carrinho
export function salvarCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const jaExiste = carrinho.some(item => item.id === produto.id);

  if (!jaExiste) {
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}

// Remove um produto do carrinho pelo id
export function removerCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const carrinhoAtualizado = carrinho.filter(item => item.id !== produto.id);

  localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
}

// Retorna todos os personagens salvos no carrinho
export function listarCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho') || '[]');
}

// Verifica se um produto já está no carrinho
export function estaCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  return carrinho.some(item => item.id === produto.id);
}

export function listarIdsCarrinho() {
   const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  return carrinho.map(item => item.id);
}
