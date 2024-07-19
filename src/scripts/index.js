import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, handleLike } from '../components/card';
import { openModal, closeModal } from '../components/modal';


const placesList = document.querySelector('.places__list');
const profileEdit = document.querySelector('.profile__edit-button');// кнопка редактирования профиля
const profileName = document.querySelector('.profile__title');// ПРЕзаполненное имя
const popupNameInput = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');// ПРЕзаполненное описание
const popupAboutInput = document.querySelector('.popup__input_type_description');
const addCard = document.querySelector('.profile__add-button');// Кнопка открытия модального окна добавления карточки
// Находим поля формы в DOM для формы редактирования описания профиля
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description') 
// Переменные DOM добавления новой карточки на страницу
const formCreateNewImageCard = document.forms['new-place']
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardLinkPlase = document.querySelector('.popup__input_type_url')
// переменные функции вызова открытия картинки карточки
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption'); 
const popupProfileEdit = document.querySelector('.popup_type_edit')
const popupAddNewCard = document.querySelector('.popup_type_new-card')// Модальное окно добавления карточки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close')// Кнопка закрытия модалки

// @todo: Вывести карточки на страницу

initialCards.forEach(function(element) {
  const cardElement = createCard(element, deleteCard, handleLike, openImage) 
  placesList.append(cardElement)
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

  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileDescription.textContent;

  openModal(popupProfileEdit);
});

// Функция редактирования данных профиля

function handleUserFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                         
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value 

    closeModal(popupProfileEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleUserFormSubmit)

// обработчик события добавления на страницу новой карточки

addCard.addEventListener('click', (e) => {
  e.preventDefault();

  openModal(popupAddNewCard)

})

// Функция добавления новой карточки

function createNewCard(event) {
  event.preventDefault();

  const newCardElement = {
    name: cardNameInput.value,
    link: cardLinkPlase.value,
  };

  const newCard = createCard(newCardElement, deleteCard, handleLike, openImage) 

  placesList.prepend(newCard);

  closeModal(popupAddNewCard);
  event.target.reset(); 
}

formCreateNewImageCard.addEventListener('submit', createNewCard);

  // Функция закрытия по клику на крестик
  
popupCloseButtons.forEach(item => {
    
  const popup = item.closest('.popup');
    
  item.addEventListener('click', () => {
  closeModal(popup);
  })
})
  