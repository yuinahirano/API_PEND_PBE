import criarNavbar, { ativarMenu } from './components/layout/navbar.component';
import { produtosPage } from './pages/produtos/personagens.page';
import { produtosCarrinhoPage } from './pages/produtos/carrinho.page'; 

criarNavbar();
produtosPage(); 

const btnHome = document.querySelector('#btnHome');
const btnCarrinho = document.querySelector('#btnCarrinho');

btnHome.addEventListener('click', () => {
  ativarMenu(btnHome);
  produtosPage();
});

btnCarrinho.addEventListener('click', () => {
  ativarMenu(btnCarrinho);
  produtosCarrinhoPage();
});