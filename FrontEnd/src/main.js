import criarNavbar, { ativarMenu } from './components/layout/navbar.component';
import { personagensPage } from './pages/personagem/personagens.page';
import { personagensFavoritosPage } from './pages/personagem/favoritos.page';

criarNavbar();
personagensPage();

const btnHome = document.querySelector('#btnHome');
const btnFavoritos = document.querySelector('#btnFavoritos');

// Controla a navegação entre páginas da aplicação
btnHome.addEventListener('click', () => {
  ativarMenu(btnHome);
  personagensPage();
});

btnFavoritos.addEventListener('click', () => {
  ativarMenu(btnFavoritos);
  personagensFavoritosPage();
});