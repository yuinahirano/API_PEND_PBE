import { buscarProdutos } from '../../services/produto/produto.api';
import { pesquisarProduto } from '../../components/layout/navbar.component';
import { criarPaginacao, renderizarProdutos } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';

export async function produtosPage() {

  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let produtos = [];
  let produtosFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">🧸 Produtos</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-produtos"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#lista-produtos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');

  produtos = await buscarProdutos();
  produtosFiltrados = produtos;

  loading.remove();
  row.classList.remove('d-none');

  function atualizarTela() {
    renderizarProdutos(row, produtosFiltrados, paginaAtual);

    const paginacao = criarPaginacao({
      totalItens: produtosFiltrados.length,
      paginaAtual,
      onPageChange: (novaPagina) => {
        paginaAtual = novaPagina;
        atualizarTela();
      }
    });

    paginacaoContainer.innerHTML = '';
    paginacaoContainer.appendChild(paginacao);
  }

  atualizarTela();

  pesquisarProduto(produtos, (resultado) => {
    paginaAtual = 1;
    produtosFiltrados = resultado;
    atualizarTela();
  });
}