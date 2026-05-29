export default function criarImagemProduto(produto) {
  const img = document.createElement('img');

  img.alt = produto.nome;
  img.className = 'card-img-top img-fluid';
  img.style.height = '360px';

  if (produto.vinculoImagem) {
    img.style.objectFit = 'cover';
    img.src = encodeURI(`http://localhost:8000${produto.vinculoImagem}`);

    // Fallback se a imagem não carregar
    img.onerror = () => {
      console.warn(`Imagem não encontrada: ${img.src}`);
      img.src = '/default-character.png';
      img.style.objectFit = '';
    };
  } else {
    img.src = '/default-character.png';
  }

  return img;
}