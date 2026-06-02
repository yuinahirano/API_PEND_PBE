// Salva um produto na lista de carrinho
export function salvarCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const index = carrinho.findIndex(item => item.id === produto.id);

  if (index !== -1) {
    carrinho[index].quantidade = (carrinho[index].quantidade ?? 1) + 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Remove uma unidade do produto, ou remove o produto se quantidade for 1
export function removerCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const index = carrinho.findIndex(item => item.id === produto.id);

  if (index !== -1) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade -= 1;
    } else {
      carrinho = carrinho.filter(item => item.id !== produto.id);
    }
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Retorna todos os produtos salvos no carrinho
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