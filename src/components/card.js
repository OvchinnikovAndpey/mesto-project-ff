export {createCard, handleLike }
import { deleteCardFromServer} from "../scripts/index";

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки

function createCard(element, likeClick, openImage) {
    const cardElement = cardsTemplate.cloneNode(true);
    const cardDelete = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    console.log(element)
    cardImage.src = element.link;
    cardImage.alt = `Изображение ${element.name}`;
    cardName.textContent = element.name;
  
    cardLikeBtn.addEventListener('click', likeClick);
  
    cardDelete.addEventListener('click', () => {
      deleteCardFromServer(element._id)
      .then(() => {
        element.remove();
      })
    });
  
    cardImage.addEventListener('click', openImage)
  
    return cardElement;
  
  }
  
//Функция удаления карточки

// function deleteCard(event) {
//     const card = event.target.closest('.card')
//     card.remove()

//  // Получаем идентификатор удаляемой карточки
//   const cardId = card.dataset.id;

//   // Вызываем функцию удаления карточки с сервера
//   deleteCardFromServer(cardId);
// } 

  // функция вызова лайка карточки

function handleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }