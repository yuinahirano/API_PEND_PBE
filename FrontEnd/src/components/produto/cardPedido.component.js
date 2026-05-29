import { atualizarStatusPedido, deletarPedido } from '../../services/produto/pedidos.api';

const BASE_URL = 'http://localhost:8000';

export default function criarCardPedido(pedido) {
  const card = document.createElement('div');
  card.className = 'card shadow-sm mb-3 w-100';
  card.innerHTML = `
    <div class="card-header d-flex justify-content-between align-items-center">
      <span class="fw-bold">Pedido #${pedido.idPedido}</span>
      <span class="badge ${pedido.Status === 'Finalizado' ? 'bg-success' : 'bg-warning text-dark'}" id="badge-status-${pedido.idPedido}">
        ${pedido.Status}
      </span>
    </div>
    <div class="card-body">
      <table class="table table-sm align-middle mb-3">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          ${pedido.itens.map(item => `
            <tr>
              <td>
                ${item.imagemProduto
                  ? `<img src="${BASE_URL}${item.imagemProduto}" alt="${item.nomeProduto}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;">`
                  : '<span class="text-muted">—</span>'
                }
              </td>
              <td>${item.nomeProduto}</td>
              <td>${parseFloat(item.Quantidade).toFixed(0)}</td>
              <td>R$ ${parseFloat(item.ValorItem).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="d-flex justify-content-between align-items-center">
        <span class="fw-bold">SubTotal: R$ ${parseFloat(pedido.SubTotal).toFixed(2)}</span>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm btn-pagar" data-id="${pedido.idPedido}" ${pedido.Status === 'Finalizado' ? 'disabled' : ''}>
            Pagar
          </button>
          <button class="btn btn-danger btn-sm btn-deletar" data-id="${pedido.idPedido}">
            Deletar
          </button>
        </div>
      </div>
    </div>
  `;

  const btnPagar = card.querySelector('.btn-pagar');
  const btnDeletar = card.querySelector('.btn-deletar');
  const badge = card.querySelector(`#badge-status-${pedido.idPedido}`);

  btnPagar.addEventListener('click', async () => {
    const resultado = await atualizarStatusPedido(pedido.idPedido, 'Finalizado');

    if (resultado) {
      badge.textContent = 'Finalizado';
      badge.className = 'badge bg-success';
      btnPagar.disabled = true;
    } else {
      alert('Erro ao atualizar status do pedido.');
    }
  });

  btnDeletar.addEventListener('click', async () => {
    const resultado = await deletarPedido(pedido.idPedido);

    if (resultado) {
      card.remove();
    } else {
      alert('Erro ao deletar pedido.');
    }
  });

  return card;
}