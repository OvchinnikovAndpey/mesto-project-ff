export {createCard, handleLike}
import { deleteCardFromServer} from "../scripts/index";

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки

function createCard(element, likeClick, openImage) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDelete = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    // console.log(element)
    cardImage.src = element.link;
    cardImage.alt = `Изображение ${element.name}`;
    cardName.textContent = element.name;

    const cardId = element._id;
    console.log(cardId)
    const userId = element.owner._id
    console.log(element.owner._id)
    
    cardImage.addEventListener('click', openImage);

    cardLikeBtn.addEventListener('click', likeClick);
  
  //   if (cardId === userId) {
  //     cardDelete.style.display = 'block';
  // } else {
  //     cardDelete.style.display = 'none';
  // }

    // cardDelete.addEventListener('click', () => {
    //   deleteCardFromServer(element._id)
    //   .then(() => {
    //     cardElement.remove();
    //   })
    // });
  
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

function handleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }