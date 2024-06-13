// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content
const placeItem = document.querySelector('.places__item');


// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

const createCard = (data, onDelete) => {
    const addCard = cardsTemplate.cloneNode(true);
    const imageCard = addCard.querySelector('.card__image')
    const titleCard = addCard.querySelector('.card__title');
    const deleteButton = addCard.querySelector('.card__delete-button')

    imageCard.src = data.link
    imageCard.alt = `Изображение ${data.name}`
    titleCard.textContent = data.name

    deleteButton.addEventListener('click', () => {
        onDelete(addCard)
      });
    
      return addCard;
}

const handleDeleteCard = (card) => {
    card.remove();
  }  

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


initialCards.forEach((data) => {
    const addCard = createCard(data, handleDeleteCard);
    placesList.append(addCard)
  })

