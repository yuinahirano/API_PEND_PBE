import { estaCarrinho, removerCarrinho, salvarCarrinho } from "../../storage/produto/carrinho.storage.js";
import { criarBotaoCarrinho } from "./button.component.js";
import criarImagemProduto from "./imagem.component.js";
import criarPrecoProduto from "./preco.component.js";
import { buscarNomeCategoria } from "../../services/produto/categoria.api.js";

export default function criarCardProduto(produto, onFavoritoAlterado) {
  // Verifica se o produto já está no carrinho
  let carrinho = estaCarrinho(produto);

  const card = document.createElement('div');
  card.className = 'card produto-card border-0';

  // Se já estiver no carrinho, aplica a classe visual de destaque
  if (carrinho) {
    card.classList.add('carrinho');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'position-relative overflow-hidden';

  const imagem = criarImagemProduto(produto);
  imagem.classList.add('card-img-top', 'produto-img');

  // Botão posicionado no canto superior direito da imagem
  const btnContainer = document.createElement('div');
  btnContainer.className = 'position-absolute top-0 end-0 m-2';

  const button = criarBotaoCarrinho(carrinho);

  button.addEventListener('click', () => {
    // Inverte o estado e atualiza o visual do card
    carrinho = !carrinho;
    card.classList.toggle('carrinho', carrinho);

    // Salva ou remove do localStorage conforme o estado
    if (carrinho) {
      salvarCarrinho(produto);
    } else {
      removerCarrinho(produto);
    }

    // Notifica quem criou o card, se houver callback
    if (typeof onFavoritoAlterado === 'function') {
      onFavoritoAlterado({ produto, carrinho });
    }
  });

  btnContainer.appendChild(button);
  imageContainer.append(imagem, btnContainer);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  // Exibe "Carregando..." até a API responder com o nome real da categoria
  const categoria = document.createElement('span');
  categoria.className = 'text-uppercase small fw-bold text-warning';
  categoria.innerText = 'Carregando...';

  // Busca o nome da categoria e atualiza o span quando a API responder
  buscarNomeCategoria(produto.idCategoria).then(nome => {
    categoria.innerText = nome;
  });

  const nome = document.createElement('h5');
  nome.className = 'card-title fw-bold mt-1 mb-2';
  nome.innerText = produto.nome;

  const preco = criarPrecoProduto(produto);

  const estoque = document.createElement('p');
  estoque.className = 'card-text text-start text-muted small';
  estoque.textContent = `Estoque: ${parseInt(produto.qtdEstoque)}`;

  // Monta o corpo do card com categoria, nome, preço e estoque
  cardBody.append(categoria, nome, preco, estoque);
  card.append(imageContainer, cardBody);

  return card;
}