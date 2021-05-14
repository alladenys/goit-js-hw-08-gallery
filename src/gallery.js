import images from "./gallery-items.js";

const refs = {
galleryContainer: document.querySelector('.js-gallery'),
modalContainer: document.querySelector('.js-lightbox'),
lightBoxImg: document.querySelector('.lightbox__image'),
closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
modalOverlay: document.querySelector(".lightbox__overlay"),
}

// створення розмітки 
const cardsImg = createImgCard(images);
function createImgCard(images){
    return images
    .map(({preview, original, description}) => {
        return ` 
        <li class="gallery__item">
            <a
              class="gallery__link"
              href="${original}"
            >
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
        </li>
        `;
    })
    .join('');
}
refs.galleryContainer.insertAdjacentHTML('beforeend', cardsImg);


// виклик модалки 
refs.galleryContainer.addEventListener('click', onImgClick);


function onImgClick(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('gallery__image')) {
      return;
    }
    refs.modalContainer.classList.add("is-open");

    refs.lightBoxImg.src = evt.target.dataset.source;
    refs.lightBoxImg.alt = evt.target.alt;

    window.addEventListener('keydown', onEscClose);
    window.addEventListener('keydown', onArrowClick);
};

// закриття модалки 
refs.modalContainer.addEventListener('click', closeModalClick);

function closeModalClick() {
    if (!refs.closeBtn || !refs.modalOverlay) {
         return;
    }
  
    window.removeEventListener('keydown', onEscClose);
    refs.lightBoxImg.src = "";
    refs.lightBoxImg.alt = "";

    refs.modalContainer.classList.remove("is-open");
}
function onEscClose(evt) {
    if (evt.code === 'Escape') {
        closeModalBtn();
  }
};

// слайдер фото 
const imgSorceArray = images.map(image =>image.original);

function onArrowClick(evt){
    const numberOfImg = imgSorceArray.indexOf(refs.lightBoxImg.getAttribute('src'));
    console.log(numberOfImg)
  if (evt.code === 'ArrowRight' && numberOfImg < (imgSorceArray.length-1)) {
    refs.lightBoxImg.setAttribute('src', imgSorceArray[numberOfImg + 1]);
  };

  if (evt.code === 'ArrowLeft' && numberOfImg !== 0) {
  refs.lightBoxImg.setAttribute('src', imgSorceArray[numberOfImg - 1])
  }
};
