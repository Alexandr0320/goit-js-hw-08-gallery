import defaultEl from './app.js';
const itemsGalleryEl = document.querySelector('.js-gallery');
const lightboxModalIsOpen = document.querySelector('.js-lightbox');
const lightboxModalBtnClose = document.querySelector('button[data-action ="close-lightbox"]');
const lightboxContent = document.querySelector('.lightbox__content');
const overEl = document.querySelector('.lightbox__overlay');

const galleryMarcup = createItemsLigtxbox(defaultEl)
itemsGalleryEl.insertAdjacentHTML('beforeend', galleryMarcup)

function createItemsLigtxbox(defaultEl) {
 return defaultEl.map(({ preview, description, original }) => {
      return `
    <li class = "gallery__item">
  <a class = "gallery__link"
  href = "${original}" >
  <img loading = "lazy" class="gallery__image"
  src = "${preview}"
  data-sours = "${original}"
  alt = "${description}"
  />
  </a>
  </li>
  `;
 }).join(" ");
};

const imgEl = document.querySelector('.gallery__image');

itemsGalleryEl.addEventListener('click', e); 

let item;
function e(eve) {
  eve.preventDefault();
  if (eve.target.className !== imgEl.className) {
    return;
  }
  const itemsImgEl = eve.target.alt;
  for (let i = 0; i < defaultEl.length; i++) {
    if (defaultEl[i].description === itemsImgEl) {
      item = defaultEl[i].original;
    }
  }

  lightboxModalIsOpen.classList.add('is-open');
  lightboxContent.innerHTML = `<img class="lightbox__image"
    src="${item}"
    alt="${itemsImgEl}"
  />`;
}


lightboxModalBtnClose.addEventListener('click', () => {
 lightboxModalIsOpen.classList.remove('is-open');
});

// ============ Очистка после закрытия модалки ============ //

function isOpen() {
  const imgModal = document.querySelector('.lightbox__image');
  lightboxModalIsOpen.classList.remove('is-open');
  imgModal.alt = '';
  imgModal.src = '';
}
const closeModalEl = document.querySelector('[data-action="close-lightbox"]');
closeModalEl.addEventListener('click', isOpen);

overEl.addEventListener('click', isOpen);

// ============ Управление кнопками ============ //

document.addEventListener('keydown', eve => {
  const imgModal = document.querySelector('.lightbox__image');

  // ============ Кнопка Esc ============ //
  if (eve.code === 'Escape') {
    isOpen()
  }
  if (lightboxModalIsOpen.className.includes('is-open')) {
    const mapDefEl = defaultEl.map(value => value.original);
    const indElNum = Number(mapDefEl.indexOf(imgModal.src));

    // ============ Кнопки влево, вправо ============ //
    const mapDelLight = Number(mapDefEl.length) - 1;
    if (eve.code === 'ArrowLeft') {
      if (eve.target.className === imgEl.className) {
        return;
      }
      const indLeftEl = indElNum - 1;
      imgModal.src = mapDefEl[indLeftEl];
      if (indElNum === 0) {
       imgModal.src = mapDefEl[mapDelLight];
      }
    }
        if (eve.code === 'ArrowRight') {
      if (eve.target.className === imgEl.className) {
        return;
      }
      const indEl = indElNum + 1;
      imgModal.src = mapDefEl[indEl];
      if (indEl === mapDefEl.length) {
        imgModal.src = mapDefEl[0];
      }
    }
  }
});
