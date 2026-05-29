import { estaCarrinho, removerCarrinho, salvarCarrinho } from "../../storage/produto/carrinho.storage";
import { criarBotaoCarrinho } from "./button.component";
import criarImagemPoduto from "./imagem.component";
import criarPrecoProduto from "./preco.component";

export default function criarCardProduto(produto, onFavoritoAlterado) {
  let carrinho = estaCarrinho(produto);

  const card = document.createElement('div');
  card.className = 'card produto-card border-0';

  if (carrinho) {
    card.classList.add('carrinho');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'position-relative overflow-hidden';

  const imagem = criarImagemPoduto(produto);
  imagem.classList.add('card-img-top', 'produto-img');

  const btnContainer = document.createElement('div');
  btnContainer.className = 'position-absolute top-0 end-0 m-2';

  const button = criarBotaoCarrinho(carrinho);
  button.addEventListener('click', () => {
    carrinho = !carrinho;

    card.classList.toggle('carrinho', carrinho);

    if (carrinho) {
      salvarCarrinho(produto);
    } else {
      removerCarrinho(produto);
    }

    if (typeof onFavoritoAlterado === 'function') {
      onFavoritoAlterado({
        produto,
        carrinho
      });
    }
  });

  btnContainer.appendChild(button);
  imageContainer.append(imagem, btnContainer);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const nome = document.createElement('h5');
  nome.className = 'card-title fw-bold mt-1 mb-2';
  nome.innerText = produto.nome;

  const preco = criarPrecoProduto(produto);

  const estoque = document.createElement('p');
  estoque.className = 'card-text text-start text-muted small';
  estoque.textContent = `Estoque: ${parseInt(produto.qtdEstoque)}`;

  cardBody.append(nome, preco, estoque);

  card.append(imageContainer, cardBody);

  return card;
}