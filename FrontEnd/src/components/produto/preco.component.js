export default function criarPrecoProduto(produto) {
  const preco = document.createElement('p');

  preco.className = 'card-text text-start';
  preco.textContent = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;

  return preco;
}