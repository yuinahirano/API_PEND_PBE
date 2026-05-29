import { estaCarrinho, removerCarrinho, salvarCarrinho } from "../../storage/produto/carrinho.storage";
import { botaoAddQuantidade, criarBotaoCarrinho, botaoDelQuantidade } from "./button.component";
import criarImagemPoduto from "./imagem.component";
import criarPrecoProduto from "./preco.component";

export default function criarCardProduto(produto, onFavoritoAlterado) {

  const controleQuantidade = criarBotaoQuantidade(produto);
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

  // imageContainer.append(imagem, btnContainer);
  imageContainer.append(imagem);
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  
  const nome = document.createElement('h5');
  nome.className = 'card-title fw-bold mt-1 mb-2';
  nome.innerText = produto.nome;
  
  const preco = criarPrecoProduto(produto);
  
  const estoque = document.createElement('p');
  estoque.className = 'card-text text-start text-muted small';
  estoque.textContent = `Estoque: ${parseInt(produto.qtdEstoque)}`;
  
  const btnContainer = document.createElement('div');
  btnContainer.className = 'd-flex justify-content-center bottom-0 mx-4 my-2';

  const button = criarBotaoCarrinho(carrinho);

  //evento de clicar para adicionar no carrinho
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

  cardBody.append(nome, preco, estoque, controleQuantidade, btnContainer);

  card.append(imageContainer, cardBody);

  return card;
}

export function criarBotaoQuantidade(produto) {

  const cardQuantidade = document.createElement('div');
  cardQuantidade.className = 'd-flex flex-row justify-content-center align-items-center';

  const cardQtdAviso = document.createElement('div');
  cardQtdAviso.className = 'd-flex flex-column justify-content-center align-items-center';

  const inputQuantidade = document.createElement('input');
  // inputQuantidade.type = 'number';
  inputQuantidade.value = 0;
  inputQuantidade.className = 'form-control m-0 w-25 text-center';

  //verifica o valor de quantidade se ja tem algum valor
  const chaveStorage = `qtd_produto_${produto.id}`;
  const valorSalvo = localStorage.getItem(chaveStorage);
  inputQuantidade.value = valorSalvo !== null ? parseInt(valorSalvo) : 1;

  const aviso = document.createElement('p');
  aviso.className = 'text-danger';

  const butAdd = botaoAddQuantidade();
  const butDel = botaoDelQuantidade();

  const atualizarStorage = (valor) => {
    localStorage.setItem(chaveStorage, valor);
  };

  inputQuantidade.addEventListener('input', () => {
    let valorDigitado = parseInt(inputQuantidade.value);
    let letraDigitada = inputQuantidade.value;

    if (isNaN(letraDigitada) || valorDigitado < 1) {

      valorDigitado = 1;
      inputQuantidade.value = valorDigitado;
    }


    if (valorDigitado > produto.qtdEstoque) {

      aviso.innerText = 'Quantidade acima do estoque disponível.';
      valorDigitado = parseInt(produto.qtdEstoque);
      inputQuantidade.value = valorDigitado;
    } else
      aviso.innerText = '';
  })

  inputQuantidade.addEventListener('blur', () => {
    if (inputQuantidade.value === '' || isNaN(parseInt(inputQuantidade.value))) {
      inputQuantidade.value = 1;
    }
    atualizarStorage(inputQuantidade.value);
  })

  inputQuantidade.addEventListener('change', () => {
    if (inputQuantidade === '' || parseInt(inputQuantidade.value) < 0 || isNaN(parseInt(inputQuantidade.value)))
      inputQuantidade.value = 1;
  })

  butAdd.addEventListener('click', () => {

    let numInserido = parseInt(inputQuantidade.value);

    if (produto.qtdEstoque > numInserido) {

      numInserido++;
      inputQuantidade.value = numInserido;
      aviso.innerText = '';

      atualizarStorage(numInserido);
    } else {
      aviso.innerText = 'Quantidade acima do estoque disponível!';

    }
  })

  butDel.addEventListener('click', () => {

    let numInserido = parseInt(inputQuantidade.value);

    if (numInserido > 1) {

      numInserido--;
      inputQuantidade.value = numInserido;
      aviso.innerText = '';

      atualizarStorage(numInserido);
    }
  })


  cardQuantidade.append(butAdd, inputQuantidade, butDel);
  cardQtdAviso.append(cardQuantidade, aviso);

  return cardQtdAviso;
}