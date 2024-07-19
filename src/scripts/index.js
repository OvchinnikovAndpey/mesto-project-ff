import '../pages/index.css';
import { initialCards } from './cards';


// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(element) {
  const cardElement = createCard(element, deleteCard, handleLike, openImage) 
  placesList.append(cardElement)
})

// @todo: Функция удаления карточки

function deleteCard(event) {
  const card = event.target.closest('.card')
  card.remove()
}

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


// Функция вызова открытия картинки карточки
const openImagePopup = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');

function openImage(evt) {
  
  imagePopup.src = evt.target.src
  imagePopup.alt = evt.target.alt
  captionPopup.textContent = evt.target.alt

  openModal(openImagePopup)
}

// функция вызова лайка карточки

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// кнопка редактирования профиля

const ProfileEdit = document.querySelector('.profile__edit-button');

// модальное окно редактирования профиля

const popupProfileEdit = document.querySelector('.popup_type_edit');

// ПРЕзаполненное имя

const profileName = document.querySelector('.profile__title');

const popupNameInput = document.querySelector('.popup__input_type_name');

// ПРЕзаполненное описание

const profileDescription = document.querySelector('.profile__description');

const popupAboutInput = document.querySelector('.popup__input_type_description');

// Кнопка открытия модального окна добавления карточки
const addCard = document.querySelector('.profile__add-button');

// Модальное окно добавления карточки
const popupAddNewCard = document.querySelector('.popup_type_new-card')

// Оверлей
const modalWindow = document.querySelector('.popup')

// Кнопка закрытия модалки
const popupCloseBtn = document.querySelectorAll('.popup__close')

// обработчик события редактирования профиля с ПРЕзаполненными данными ранее

ProfileEdit.addEventListener('click', (e) => {
  e.preventDefault();

  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileDescription.textContent;

  openModal(popupProfileEdit);
});

// форма редактирования карточки


const formElement = document.querySelector('.popup__form')

// Находим поля формы в DOM
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description') 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                               
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value 

    closeModal(popupProfileEdit);
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit)

// обработчик события добавления на страницу новой карточки

addCard.addEventListener('click', (e) => {
  e.preventDefault();

  openModal(popupAddNewCard)

})

// функция открытия модального окна

const openModal = (popup) => {
  popup.classList.add("popup_is-animated");
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('click', closeOverlay);
}

// Функция закрытия кнопкой ESCAPE

const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openModals = document.querySelector('.popup_is-opened');
    closeModal(openModals);
  };
};

// Функция закрытия по клику на крестик

popupCloseBtn.forEach(item => {
  item.addEventListener('click', () => {
    closeModal(popupProfileEdit);
    closeModal(popupAddNewCard);
    closeModal(openImagePopup)
  })
})

// Функция закрытия нажатием на оверлей

const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  };
};

  // Функция закрытия модального окна

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeEsc)
  document.removeEventListener('click', closeOverlay)
}


// Функция добавления новой карточки

// DOM элементы
const formCreateNewImageCard = document.forms['new-place']
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardLinkPlase = document.querySelector('.popup__input_type_url')

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


