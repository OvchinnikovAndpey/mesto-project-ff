export {createCard, handleLike}
import { deleteCardFromServer, addLike, deleteLike} from "../components/api";

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки

function createCard(element, deleteCard, likeClick, openImage, userId) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDelete = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const likeOnCard = cardElement.querySelector('.card__like-button-count')
    const cardId = element._id;
    // console.log(cardId)
    // const userId = element.owner._id

    cardImage.src = element.link;
    cardImage.alt = `Изображение ${element.name}`;
    cardName.textContent = element.name;
    likeOnCard.textContent = element.likes.length
  
  if (userId === element.owner._id) {
      cardDelete.style.display = 'block';
      console.log('Выполнится, если условие истинное (true)')
  } else {
      cardDelete.style.display = 'none';
  }

  cardLikeBtn.addEventListener('click', (evt) => {
    likeClick(evt, cardId, likeOnCard)
  });

  cardDelete.addEventListener('click', () => {
      deleteCardFromServer(element._id)
      .then(() => {
        cardElement.remove();
      })
    });
  
    if (element.likes.some((like) => like._id == userId)) {
      cardLikeBtn.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', openImage);
  
if (userId != userId) {
  cardDelete.remove();
} else { 
  cardDelete.addEventListener('click', () => {
    deleteCardFromServer(cardsTemplate, cardId)
    .then(() => {
          cardElement.remove();
        })
  });

}

    return cardElement;
}

  // функция вызова лайка карточки

function handleLike(evt, cardId, likeCountainer) {

  const likeButton = evt.target;
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    console.log(cardId)
    addLike(cardId)
    .then((res) => {
      likeButton.classList.add('card__like-button_is-active')
      likeCountainer.textContent = res.likes.length
    })
  } else {
    deleteLike(cardId)
    .then((res) => {
      likeButton.classList.remove('card__like-button_is-active')
      likeCountainer.textContent = res.likes.length
    })
  }

}
