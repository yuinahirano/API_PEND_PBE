import { criarPaginacao } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';
import { buscarPedidos } from '../../services/produto/pedidos.api';
import { buscarProdutos } from '../../services/produto/produto.api';
import { pesquisarProduto } from '../../components/layout/navbar.component';
import criarCardPedido from '../../components/produto/cardPedido.component';

export async function pedidosPage() {

  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let pedidos = [];
  let pedidosFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">🧾Meus Pedidos</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-pedidos"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#lista-pedidos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');

  const [itensFlat, produtos] = await Promise.all([buscarPedidos(), buscarProdutos()]);
  const mapaProdutos = new Map(produtos.map(p => [p.id, p]));

  pedidos = agruparPedidos(itensFlat, mapaProdutos);
  pedidosFiltrados = pedidos;

  loading.remove();
  row.classList.remove('d-none');

  function atualizarTela() {
    renderizarPedidos(row, pedidosFiltrados, paginaAtual);

    const paginacao = criarPaginacao({
      totalItens: pedidosFiltrados.length,
      paginaAtual,
      onPageChange: (novaPagina) => {
        paginaAtual = novaPagina;
        atualizarTela();
      }
    });

    paginacaoContainer.innerHTML = '';
    paginacaoContainer.appendChild(paginacao);
  }

  function pesquisarPedidos(listaPedidos, onResultado) {
    pesquisarProduto((termo) => {
      const termoNormalizado = termo.toLowerCase();
      const resultado = listaPedidos.filter((pedido) =>
        JSON.stringify(pedido).toLowerCase().includes(termoNormalizado)
      );
      onResultado(resultado);
    });
  }

  atualizarTela();

  pesquisarPedidos(pedidos, (resultado) => {
    paginaAtual = 1;
    pedidosFiltrados = resultado;
    atualizarTela();
  });
}

function agruparPedidos(itens, mapaProdutos) {
  const mapa = new Map();

  itens.forEach(item => {
    if (!mapa.has(item.idPedido)) {
      mapa.set(item.idPedido, {
        idPedido: item.idPedido,
        idCliente: item.idCliente,
        SubTotal: item.SubTotal,
        Status: item.Status,
        itens: []
      });
    }

    const produto = mapaProdutos.get(item.idProduto);

    mapa.get(item.idPedido).itens.push({
      itemId: item.itemId,
      idProduto: item.idProduto,
      Quantidade: item.Quantidade,
      ValorItem: item.ValorItem,
      nomeProduto: produto?.nome ?? 'Produto não encontrado',
      imagemProduto: produto?.vinculoImagem ?? null
    });
  });

  return Array.from(mapa.values());
}

function renderizarPedidos(row, pedidos, paginaAtual, itensPorPagina = 5) {
  row.innerHTML = '';

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  pedidos.slice(inicio, fim).forEach(pedido => {
    const card = criarCardPedido(pedido);
    row.appendChild(card);
  });
}