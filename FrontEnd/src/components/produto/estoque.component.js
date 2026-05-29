export default function criarEstoqueProduto(produto) {
  const estoque = document.createElement('p');

  estoque.className = 'card-text text-start';
  estoque.textContent = `R$ ${parseFloat(produto.estoque).toFixed(2).replace('.', ',')}`;

  return preco;
}