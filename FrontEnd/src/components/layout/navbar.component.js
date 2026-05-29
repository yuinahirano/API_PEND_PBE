export default function criarNavbar() {
  const header = document.querySelector('header');
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand-lg bg-light shadow-sm';

  nav.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">
        Labubu's Store
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="menu">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <button class="nav-link fw-bold text-primary active" id="btnHome">Home</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="btnCarrinho">Carrinho</button>
          </li>
            <li class="nav-item">
            <button class="nav-link" id="btnPedidos">Pedidos</button>
          </li>
        </ul>
      </div>

      <form class="d-flex">
        <input class="form-control" type="search" placeholder="Pesquisar" id="inputSearch">
      </form>
    </div>
  `;

  header.appendChild(nav);
}

export function ativarMenu(botaoClicado) {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active', 'text-primary', 'fw-bold');
  });

  botaoClicado.classList.add('active', 'text-primary', 'fw-bold');
}

export function pesquisarProduto(produtos, onSearch) {
  const inputSearch = document.querySelector('#inputSearch');

  inputSearch.addEventListener('input', () => {
    const termo = inputSearch.value.toLowerCase();
    const filtrados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo)
    );

    onSearch(filtrados);
  });
}