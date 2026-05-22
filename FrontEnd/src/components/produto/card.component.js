import { criarBotaoFavorito } from './button.component';
import criarImagemPersonagem from './imagem.component';
import {
  salvarFavorito,
  removerFavorito,
  ehFavorito
} from '../../storage/personagem/favoritos.storage';

// Cria o card visual de um personagem.
// `onFavoritoAlterado` é opcional: quem cria o card decide se quer reagir ao clique.
export default function criarCardPersonagem(personagem, onFavoritoAlterado) {
  let favorito = ehFavorito(personagem);

  const card = document.createElement('div');
  card.className = 'card personagem-card border-0';

  if (favorito) {
    card.classList.add('favorito');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'position-relative overflow-hidden';

  const imagem = criarImagemPersonagem(personagem);
  imagem.classList.add('card-img-top', 'personagem-img');

  const btnContainer = document.createElement('div');
  btnContainer.className = 'position-absolute top-0 end-0 m-2';

  const button  = criarBotaoFavorito(favorito);
  button.addEventListener('click', () => {
    // 1) Inverte o estado local do card.
    favorito = !favorito;

    // 2) Reflete visualmente (borda/estilo de favorito).
    card.classList.toggle('favorito', favorito);

    // 3) Persiste no localStorage.
    if (favorito) {
      salvarFavorito(personagem);
    } else {
      removerFavorito(personagem);
    }

    // 4) Notifica quem criou o card.
    if (typeof onFavoritoAlterado === 'function') {
      onFavoritoAlterado({
        personagem,
        favorito
      });
    }
  });

  btnContainer.appendChild(button);
  imageContainer.append(imagem, btnContainer);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const casa = document.createElement('span');
  casa.className = 'text-uppercase small fw-bold text-warning';
  casa.innerText = personagem.house || 'Desconhecida';

  const nome = document.createElement('h5');
  nome.className = 'card-title fw-bold mt-1 mb-2';
  nome.innerText = personagem.name;

  cardBody.append(casa, nome);

  card.append(imageContainer, cardBody);

  return card;
}