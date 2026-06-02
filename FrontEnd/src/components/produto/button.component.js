// Cria o botão para adicionar ao carrinho
export function criarBotaoCarrinho(carrinho = false) {
  const button = document.createElement('button');

  button.className = `
    btn p-0 border-0 rounded-30
    d-flex align-items-center justify-content-center
    bg-secondary w-75
  `;

  button.style.width = '40px';
  button.style.height = '40px';
  button.style.backdropFilter = 'blur(4px)';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';

  // estado inicial
  icon.innerText = carrinho ? 'remove_shopping_cart' : 'add_shopping_cart';

  button.appendChild(icon);

  return button;
}

// Cria o botão para remover do carrinho
export function buttonRemover() {
  const buttonRemover = document.createElement('button');
  buttonRemover.className = 'btn btn-sm btn-outline-danger';
  buttonRemover.innerText = '🗑️';

  return buttonRemover;
}

//cria botão que controla a quantidade de itens para o carrinho
export function botaoAddQuantidade() {
  const buttonAdd = document.createElement('button');

  buttonAdd.className = `
        btn p-0 border-0 rounded-circle
        d-flex align-items-center justify-content-center
        bg-primary m-3
    `;

  buttonAdd.style.width = '50px';
  buttonAdd.style.height = '50px';

  const icon = document.createElement('span');
  icon.innerText = "+";
  icon.className = 'text-black';

  buttonAdd.appendChild(icon);

  return buttonAdd;
}

export function botaoDelQuantidade() {
  const buttonDel = document.createElement('button');

  buttonDel.className = `
        btn p-0 border-0 rounded-circle
        d-flex align-items-center justify-content-center
        bg-primary m-3
    `;

  buttonDel.style.width = '50px';
  buttonDel.style.height = '50px';

  const icon = document.createElement('span');
  icon.innerText = "-";
  icon.className = 'text-black';


  buttonDel.appendChild(icon);

  return buttonDel;
}