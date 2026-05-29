// Cria o botão para adicionar ao carrinho
export function criarBotaoCarrinho(carrinho = false) {
  const button = document.createElement('button');

  button.className = `
    btn p-0 border-0 rounded-circle
    d-flex align-items-center justify-content-center
    bg-light bg-opacity-75
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