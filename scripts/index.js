// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content
const placeItem = document.querySelector('.places__item');


// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// document.querySelector('.page').onclick = function(e) {
//   if(e.target.className != 'card__delete-button') return
//   let card = e.target.closest('.card')
//   card.remove()
// }

// @todo: Вывести карточки на страницу

// initialCards.forEach(function(element) {
//   const cardElement = cardsTemplate.cloneNode(true);
//   const cardDelete = cardsTemplate.querySelector('.card__delete-button');

//   cardElement.querySelector('.card__image').src = element.link;
//   cardElement.querySelector('.card__title').textContent = element.name;

//   placesList.append(cardElement)

//   return cardElement;

// })


// cardDelete.addEventListener('click', function()  {
//   const handDeleteCard = cardDelete.closest('.card');
//   card.remove()
// });


function createCard(element, deleteCard) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardDelete = cardsTemplate.querySelector('.card__delete-button');
  
  const cardImage = cardElement.querySelector('.card__image')
  const cardName = cardElement.querySelector('.card__title')
  
  cardImage.src = element.link;
  cardName.textContent = element.name;

  cardDelete.addEventListener('click', deleteCard) 

  return cardElement;

}




initialCards.forEach(function(element) {
  const cardElement = createCard(element, deleteCard) 
  placesList.append(cardElement)
})

function deleteCard(event) {
  let card = event.target.closest('.card')
  card.remove()
}

