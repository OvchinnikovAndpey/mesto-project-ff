export {createCard, deleteCard, handleLike, placesList}

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(element, deleteCard, likeClick, openImage) {
    const cardElement = cardsTemplate.cloneNode(true);
    
    const cardDelete = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    
    cardImage.src = element.link;
    cardImage.alt = `Изображение ${element.name}`;
    cardName.textContent = element.name;
  
    cardLikeBtn.addEventListener('click', likeClick);
  
    cardDelete.addEventListener('click', deleteCard) 
  
    cardImage.addEventListener('click', openImage)
  
    return cardElement;
  
  }
  
// @todo: Функция удаления карточки

function deleteCard(event) {
    const card = event.target.closest('.card')
    card.remove()
  } 

  // функция вызова лайка карточки

function handleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }