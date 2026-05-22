import { listarFavoritos } from '../../storage/personagem/favoritos.storage';
import { criarPaginacao, renderizarPersonagens } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';
import { ITENS_POR_PAGINA } from '../../config/app.config';

export async function personagensFavoritosPage() {
  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let favoritos = [];
  let favoritosFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">⭐ Favoritos</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-personagens"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#lista-personagens');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');
  const inputSearch = document.querySelector('#inputSearch');
  let termoBusca = '';

  favoritos = listarFavoritos();
  favoritosFiltrados = favoritos;

  loading.remove();
  row.classList.remove('d-none');

  function filtrarFavoritos(lista) {
    if (!termoBusca) {
      return lista;
    }

    return lista.filter((personagem) =>
      personagem.name.toLowerCase().includes(termoBusca)
    );
  }

  function sincronizarFavoritos() {
    favoritos = listarFavoritos();
    favoritosFiltrados = filtrarFavoritos(favoritos);

    const totalPaginas = Math.max(1, Math.ceil(favoritosFiltrados.length / ITENS_POR_PAGINA));
    paginaAtual = Math.min(paginaAtual, totalPaginas);
  }

  function atualizarTela() {
    // Argumentos enviados para `renderizarPersonagens`:
    // 1) row: elemento HTML onde os cards serão desenhados
    // 2) favoritosFiltrados: lista atual (já com busca aplicada)
    // 3) paginaAtual: qual "fatia" da lista deve aparecer
    // 4) opcoes: objeto para comportamentos extras (opcional)
    //
    // Aqui estamos enviando `onFavoritoAlterado` dentro de `opcoes`.
    // Esse callback é executado pelo card quando o aluno clica no botão de favorito.
    renderizarPersonagens(row, favoritosFiltrados, paginaAtual, {
      // `({ favorito })` é desestruturação de objeto:
      // - o card envia um objeto com dados da ação
      // - pegamos somente a propriedade `favorito`
      // Exemplo do objeto completo recebido:
      // { personagem: {...}, favorito: false }
      onFavoritoAlterado: ({ favorito }) => {
        // Se virou `false`, significa que o item foi removido dos favoritos.
        if (!favorito) {
          // Recarrega lista + recalcula paginação.
          sincronizarFavoritos();
          // Redesenha a tela com os novos dados.
          atualizarTela();
        }
      }
    });

    const paginacao = criarPaginacao({
      totalItens: favoritosFiltrados.length,
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
    favoritosFiltrados = filtrarFavoritos(favoritos);
    paginaAtual = 1;
    atualizarTela();
  });
}