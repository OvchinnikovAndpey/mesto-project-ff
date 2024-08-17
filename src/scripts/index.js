import '../pages/index.css';
import { createCard, handleLike } from '../components/card';
import { openModal, closeModal } from '../components/modal';
import { enableValidation, validationConfig, clearValidation } from '../components/validation.js'
import {addCardToPage, profileEditFunction, getInitialCards, getUserInfo, avatarEdit} from '../components/api.js'
// import { initialCards } from './cards'; - Прездзагружаемые карточки
// import { get } from 'core-js/core/dict';

const placesList = document.querySelector('.places__list');
const profileEdit = document.querySelector('.profile__edit-button');// кнопка редактирования профиля
const profileName = document.querySelector('.profile__title');// ПРЕзаполненное имя
const popupNameInput = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');// ПРЕзаполненное описание
const popupAboutInput = document.querySelector('.popup__input_type_description');
const addCard = document.querySelector('.profile__add-button');// Кнопка открытия модального окна добавления карточки
// Находим поля формы в DOM для формы редактирования описания профиля
const formEditProfile = document.forms['edit-profile'];
const editProfileSaveBtn = formEditProfile.querySelector('.popup__button')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description') 
// Переменные DOM добавления новой карточки на страницу
const formCreateNewImageCard = document.forms['new-place']
const addCardSaveBtn = formCreateNewImageCard.querySelector('.popup__button')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardLinkPlase = document.querySelector('.popup__input_type_url')
// переменные функции вызова открытия картинки карточки
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption'); 
const popupProfileEdit = document.querySelector('.popup_type_edit')
const popupAddNewCard = document.querySelector('.popup_type_new-card')// Модальное окно добавления карточки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close')// Кнопка закрытия модалки
const profileImage = document.querySelector('.profile__image')
const popupAvatar = document.querySelector('.popup__avatar-replace');
const avatarBtn = document.querySelector('.profile__image');
const avatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = document.querySelector('.popup__input_type_url_avatar');
const avatarSaveBtn = avatarForm.querySelector('.popup__button');

enableValidation(validationConfig);

// Обработчик события нажатия на аватар
avatarBtn.addEventListener('click', (e) => {
  avatarInput.value = '';
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
})

// Отправка изменений аватара

avatarForm.addEventListener('submit', (e) => {
  e.preventDefault(e)
  saveTextBtn(avatarSaveBtn, true)
  avatarEdit(avatarInput.value)
  .then((response) => {
    console.log(response)
    avatarBtn.style.backgroundImage = `url(${response.avatar})`;
    closeModal(popupAvatar);
  })
  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    saveTextBtn(avatarSaveBtn, false)
  })
})

// Функция вызова открытия картинки карточки

function openImage(evt) {
  
  imagePopup.src = evt.target.src
  imagePopup.alt = evt.target.alt
  captionPopup.textContent = evt.target.alt

  openModal(popupTypeImage)
}

// обработчик события редактирования профиля с ПРЕзаполненными данными ранее

profileEdit.addEventListener('click', (e) => {
  e.preventDefault();

  clearValidation(popupProfileEdit, validationConfig)

  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileDescription.textContent;

  openModal(popupProfileEdit);
});

// Функция редактирования данных профиля

function handleUserFormSubmit(evt) {
    evt.preventDefault();                                        
    
    saveTextBtn(editProfileSaveBtn, true)
    
    profileEditFunction(profileName.textContent, profileDescription.textContent)
      .then(() => {
        profileName.textContent = nameInput.value
        profileDescription.textContent = jobInput.value 
        closeModal(popupProfileEdit)
      })

      .catch((err) => {
        console.log(err)
      })
      
      .finally(() => {
        saveTextBtn(editProfileSaveBtn, false)
      })
}

// Прикрепляем обработчик к форме:

formEditProfile.addEventListener('submit', handleUserFormSubmit)

// обработчик события добавления на страницу новой карточки

addCard.addEventListener('click', (e) => {
  e.preventDefault();

  openModal(popupAddNewCard)

  clearValidation(popupAddNewCard, validationConfig);
})



// Функция добавления новой карточки

function createNewCard(event) {
  event.preventDefault();

  saveTextBtn(addCardSaveBtn, true)
  
  const newCardElement = {
    name: cardNameInput.value,
    link: cardLinkPlase.value,
  };
  


  addCardToPage(newCardElement)
  .then((cardData) => {
    const newCard = createCard(cardData, deleteCard, handleLike, openImage, userId) 

    placesList.prepend(newCard);
    closeModal(popupAddNewCard);
    event.target.reset(); 
    
  })
  
  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    saveTextBtn(addCardSaveBtn, false)
  })

}

formCreateNewImageCard.addEventListener('submit', createNewCard);

// Функция закрытия по клику на крестик
  
popupCloseButtons.forEach(item => {
    
  const popup = item.closest('.popup');
    
  item.addEventListener('click', () => {
  closeModal(popup);
  })
})
  
function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
});
} 

// Функция получения (отображения) карточек на странице, загруженных с сервера
let userId

function getAddCardsAndInfo() {
  return Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    console.log({userData, cardsData})
  
    profileName.textContent = userData.name
    profileDescription.textContent = userData.about
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    
    userId = userData._id
    // console.log(userId)
    cardsData.forEach((element) => {
      const newCard = createCard(element, deleteCard, handleLike, openImage, userId)
      placesList.append(newCard)
    })
  })
  .catch((err) => {
    console.log(err)
  })

}

// Вызов функции вывода карточек

getAddCardsAndInfo()

// Добавление статуса сохранения

function saveTextBtn (buttonElement, status) {
  
  buttonElement.textContent = status ? 'Сохранение...' : 'Сохранить'
}

