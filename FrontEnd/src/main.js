import criarNavbar, { ativarMenu } from './components/layout/navbar.component';
import { produtosPage } from './pages/produtos/produtos.page';
import { produtosCarrinhoPage } from './pages/produtos/carrinho.page';
import { pedidosPage } from './pages/produtos/pedidos.page';

criarNavbar();
produtosPage();

const btnHome = document.querySelector('#btnHome');
const btnCarrinho = document.querySelector('#btnCarrinho');
const btnPedidos = document.querySelector('#btnPedidos');

btnHome.addEventListener('click', () => {
  ativarMenu(btnHome);
  produtosPage();
});

btnCarrinho.addEventListener('click', () => {
  ativarMenu(btnCarrinho);
  produtosCarrinhoPage();
});

btnPedidos.addEventListener('click', () => {
  ativarMenu(btnPedidos);
  pedidosPage();
});