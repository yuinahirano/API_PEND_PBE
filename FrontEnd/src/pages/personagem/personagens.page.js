import { buscarPersonagens } from '../../services/personagem/personagem.api';
import { pesquisarPersonagem } from '../../components/layout/navbar.component';
import { criarPaginacao, renderizarPersonagens } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';

export async function personagensPage() {

  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let personagens = [];
  let personagensFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">🧙 Personagens</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-personagens"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#lista-personagens');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');

  personagens = await buscarPersonagens();
  personagensFiltrados = personagens;

  loading.remove();
  row.classList.remove('d-none');

  function atualizarTela() {
    renderizarPersonagens(row, personagensFiltrados, paginaAtual);

    const paginacao = criarPaginacao({
      totalItens: personagensFiltrados.length,
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

  pesquisarPersonagem(personagens, (resultado) => {
    paginaAtual = 1;
    personagensFiltrados = resultado;
    atualizarTela();
  });
}