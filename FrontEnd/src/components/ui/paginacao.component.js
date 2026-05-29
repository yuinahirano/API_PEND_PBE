import { ITENS_POR_PAGINA, MAX_BOTOES } from '../../config/app.config';
import criarCardProduto, { criarBotaoQuantidade } from '../produto/card.component';
import criarColuna from '../shared/coluna-bootstrap.component';

export function renderizarProdutos(
    row,
    produtos,
    paginaAtual,
    opcoes = {},
    itensPorPagina = ITENS_POR_PAGINA
) {
    row.innerHTML = '';
    const { onFavoritoAlterado } = opcoes;

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const produtosPaginados = produtos.slice(inicio, fim);

    produtosPaginados.forEach(produto => {
        const coluna = criarColuna();
        const card = criarCardProduto(produto, onFavoritoAlterado);
        const cardQuantidade = criarBotaoQuantidade(produto);

        coluna.appendChild(card);
        row.appendChild(coluna);
    });
}

export function criarPaginacao({
    totalItens,
    itensPorPagina = ITENS_POR_PAGINA,
    paginaAtual,
    onPageChange
}) {
    const nav = document.createElement('nav');
    
    if (totalItens > 0) {
        const totalPaginas = Math.ceil(totalItens / itensPorPagina);
        const ul = document.createElement('ul');

        ul.className = 'pagination justify-content-center mt-4 flex-wrap';
        nav.appendChild(ul);

        ul.appendChild(criarAnterior(paginaAtual, onPageChange));

        let inicio = Math.max(1, paginaAtual - Math.floor(MAX_BOTOES / 2));
        let fim = inicio + MAX_BOTOES - 1;

        if (fim > totalPaginas) {
            fim = totalPaginas;
            inicio = Math.max(1, fim - MAX_BOTOES + 1);
        }

        if (inicio > 1) {
            ul.appendChild(criarItem(1, paginaAtual, onPageChange));

            if (inicio > 2) {
                ul.appendChild(criarEllipsis());
            }
        }

        for (let i = inicio; i <= fim; i++) {
            ul.appendChild(criarItem(i, paginaAtual, onPageChange));
        }

        if (fim < totalPaginas) {
            if (fim < totalPaginas - 1) {
                ul.appendChild(criarEllipsis());
            }

            ul.appendChild(criarItem(totalPaginas, paginaAtual, onPageChange));
        }

        ul.appendChild(criarProximo(paginaAtual, totalPaginas, onPageChange));
    }

    return nav;
}

function criarItem(numero, paginaAtual, onPageChange) {
    const li = document.createElement('li');
    li.className = `page-item ${numero === paginaAtual ? 'active' : ''}`;

    const btn = document.createElement('button');
    btn.className = 'page-link';
    btn.textContent = numero;

    btn.onclick = () => onPageChange(numero);

    li.appendChild(btn);
    return li;
}

function criarAnterior(paginaAtual, onPageChange) {
    const li = document.createElement('li');
    li.className = `page-item ${paginaAtual === 1 ? 'disabled' : ''}`;

    const btn = document.createElement('button');
    btn.className = 'page-link';
    btn.innerHTML = '&laquo;';

    btn.onclick = () => {
        if (paginaAtual > 1) {
            onPageChange(paginaAtual - 1);
        }
    };

    li.appendChild(btn);
    return li;
}

function criarProximo(paginaAtual, totalPaginas, onPageChange) {
    const li = document.createElement('li');
    li.className = `page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`;

    const btn = document.createElement('button');
    btn.className = 'page-link';
    btn.innerHTML = '&raquo;';

    btn.onclick = () => {
        if (paginaAtual < totalPaginas) {
            onPageChange(paginaAtual + 1);
        }
    };

    li.appendChild(btn);
    return li;
}

function criarEllipsis() {
    const li = document.createElement('li');
    li.className = 'page-item disabled';

    const span = document.createElement('span');
    span.className = 'page-link';
    span.textContent = '...';

    li.appendChild(span);
    return li;
}