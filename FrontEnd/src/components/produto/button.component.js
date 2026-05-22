// Cria o botão para adicionar aos favoritos
export function criarBotaoFavorito(favorito = false) {
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
  icon.innerText = 'favorite';

  button.appendChild(icon);

  return button ;
}

// Cria o botão para remover dos favoritos
export function buttonRemover() {
  const buttonRemover = document.createElement('button');
  buttonRemover.className = 'btn btn-sm btn-outline-danger';
  buttonRemover.innerText = '🗑️';

  return buttonRemover;
}