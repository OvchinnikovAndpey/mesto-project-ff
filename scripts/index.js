// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');
const placeItem = document.querySelector('.places__item');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(element) {
  const cardElement = createCard(element, deleteCard) 
  placesList.append(cardElement)
})

// @todo: Функция удаления карточки

function deleteCard(event) {
  let card = event.target.closest('.card')
  card.remove()
}

// @todo: Функция создания карточки

function createCard(element, deleteCard) {
  const cardElement = cardsTemplate.cloneNode(true);
  
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  
  cardImage.src = element.link;
  cardName.textContent = element.name;

  cardDelete.addEventListener('click', deleteCard) 

  return cardElement;

}