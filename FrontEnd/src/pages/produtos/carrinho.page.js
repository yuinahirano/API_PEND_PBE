import { criarPaginacao, renderizarProdutos } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';
import { ITENS_POR_PAGINA } from '../../config/app.config';
import { listarCarrinho, listarIdsCarrinho } from '../../storage/produto/carrinho.storage';
import { criarPedido } from '../../services/produto/pedidos.api';

export async function produtosCarrinhoPage() {
  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let carrinho = [];
  let carrinhoFiltrados = [];
  
  app.innerHTML = `
    <h1 class="fw-bold text-primary">🛒 Carrinho</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="listaProdutos"></div>
    <div class="mt-4">
    <button id="btnCriarPedido" class="btn btn-success">
    🛒 Criar Pedido
    </button>
    <div id="pedidoMensagem" class="mt-2"></div>
    <div id="paginacao"></div>
    </div>
  `;

  const row = document.querySelector('#listaProdutos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');
  const btnCriarPedido = document.querySelector('#btnCriarPedido');
  const pedidoMensagem = document.querySelector('#pedidoMensagem');
  const inputSearch = document.querySelector('#inputSearch');
  let termoBusca = '';

  carrinho = listarCarrinho();
  carrinhoFiltrados = carrinho;

  loading.remove();
  row.classList.remove('d-none');

  function filtrarCarrinho(lista) {
    if (!termoBusca) return lista;
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

btnCriarPedido.addEventListener('click', async () => {
  const carrinhAtual = listarCarrinho();

  if (carrinhAtual.length === 0) {
    pedidoMensagem.innerHTML = '<span class="text-danger">❌ Carrinho vazio.</span>';
    return;
  }

  // Monta os itens no formato que o backend espera
  const itens = carrinhAtual.map(produto => ({
    idProduto: produto.id,
    quantidade: produto.quantidade ?? 1,
    valorItem: produto.preco,
  }));

  const idCliente = 1; 

  btnCriarPedido.disabled = true;
  pedidoMensagem.innerHTML = '<span class="text-muted">Criando pedido...</span>';

  try {
    const resultado = await criarPedido(idCliente, itens);
    if (!resultado) throw new Error('Erro ao criar pedido.');
    pedidoMensagem.innerHTML = `<span class="text-success">✅ Pedido criado com sucesso!</span>`;
  } catch (erro) {
    pedidoMensagem.innerHTML = `<span class="text-danger">❌ ${erro.message}</span>`;
  } finally {
    btnCriarPedido.disabled = false;
  }
});

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

  inputSearch?.addEventListener('input', () => {
    termoBusca = inputSearch.value.toLowerCase().trim();
    carrinhoFiltrados = filtrarCarrinho(carrinho);
    paginaAtual = 1;
    atualizarTela();
  });
}