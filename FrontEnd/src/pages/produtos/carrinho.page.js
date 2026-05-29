import { criarPaginacao, renderizarProdutos } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';
import { ITENS_POR_PAGINA } from '../../config/app.config';
import { listarCarrinho } from '../../storage/produto/carrinho.storage';

export async function produtosCarrinhoPage() {
  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let carrinho = [];
  let carrinhoFiltrados = [];
  
  app.innerHTML = `
    <h1 class="fw-bold text-primary">🛒 Carrinho</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="listaProdutos"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#listaProdutos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');
  const inputSearch = document.querySelector('#inputSearch');
  let termoBusca = '';

  carrinho = listarCarrinho();
  carrinhoFiltrados = carrinho;

  loading.remove();
  row.classList.remove('d-none');

  function filtrarCarrinho(lista) {
    if (!termoBusca) {
      return lista;
    }

    return lista.filter((produto) =>
      produto.nome.toLowerCase().includes(termoBusca)
    );
  }

  function sincronizarCarrinho() {
    carrinho = listarCarrinho();
    carrinhoFiltrados = filtrarCarrinho(carrinho);

    const totalPaginas = Math.max(1, Math.ceil(carrinhoFiltrados.length / ITENS_POR_PAGINA));
    paginaAtual = Math.min(paginaAtual, totalPaginas);
  }

  function atualizarTela() {
    renderizarProdutos(row, carrinhoFiltrados, paginaAtual, {
      onFavoritoAlterado: ({ carrinho }) => {
        if (!carrinho) {
          sincronizarCarrinho();
          atualizarTela();
        }
      }
    });

    const paginacao = criarPaginacao({
      totalItens: carrinhoFiltrados.length,
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

  inputSearch.addEventListener('input', () => {
    termoBusca = inputSearch.value.toLowerCase().trim();
    carrinhoFiltrados = filtrarCarrinho(carrinho);
    paginaAtual = 1;
    atualizarTela();
  });
}