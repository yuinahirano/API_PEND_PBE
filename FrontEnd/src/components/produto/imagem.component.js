/**
 * Cria a imagem do personagem
 */
export default function criarImagemPersonagem(personagem) {
  const img = document.createElement('img');
  img.alt = personagem.name;
  img.className = 'card-img-top img-fluid';

  img.style.height = '360px';
  img.style.objectFit = personagem.image ? 'cover' : '';

  img.src = personagem.image
    ? personagem.image
    : 'public/default-character.png';

  return img;
}