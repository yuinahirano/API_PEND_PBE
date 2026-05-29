import { estaCarrinho, removerCarrinho, salvarCarrinho } from "../../storage/produto/carrinho.storage";
import { botaoAddQuantidade, criarBotaoCarrinho, botaoDelQuantidade } from "./button.component";
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

  const controleQuantidade = criarBotaoQuantidade(produto);

  const estoque = document.createElement('p');
  estoque.className = 'card-text text-start text-muted small';
  estoque.textContent = `Estoque: ${parseInt(produto.qtdEstoque)}`;


  cardBody.append(nome, preco, controleQuantidade, estoque);

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

  const aviso = document.createElement('p');
  aviso.className = 'text-danger';

  const butAdd = botaoAddQuantidade();
  const butDel = botaoDelQuantidade();

  inputQuantidade.addEventListener('input', ()=>{
    let valorDigitado = parseInt(inputQuantidade.value);
    let letraDigitada = inputQuantidade.value;

    if(isNaN(letraDigitada) || valorDigitado < 0){
      
      valorDigitado = 0;
      inputQuantidade.value = valorDigitado;
    } 


    if (valorDigitado > produto.qtdEstoque){

      aviso.innerText = 'Quantidade acima do estoque disponível.';
      valorDigitado = parseInt(produto.qtdEstoque);
      inputQuantidade.value = valorDigitado;
    }else 
      aviso.innerText = '';
  })

  inputQuantidade.addEventListener('blur', ()=>{
    let numInserido = parseInt(inputQuantidade.value);

    numInserido = 0;
  })

  inputQuantidade.addEventListener('change', ()=>{
    if(inputQuantidade === '' || parseInt(inputQuantidade.value) < 0 || isNaN(parseInt(inputQuantidade.value)))
      inputQuantidade.value = 0;
  })

  butAdd.addEventListener('click', () => {

    let numInserido = parseInt(inputQuantidade.value);

    if (produto.qtdEstoque > numInserido) {

      numInserido++;
      inputQuantidade.value = numInserido;
      aviso.innerText = '';

    } else {
      aviso.innerText = 'Quantidade acima do estoque disponível!';

    }
  })

  butDel.addEventListener('click', () => {

    let numInserido = parseInt(inputQuantidade.value);

    if (numInserido > 0) {

      numInserido--;
      inputQuantidade.value = numInserido;
      aviso.innerText = '';
    }
  })


  cardQuantidade.append(butAdd, inputQuantidade, butDel);
  cardQtdAviso.append(cardQuantidade, aviso);

  return cardQtdAviso;
}