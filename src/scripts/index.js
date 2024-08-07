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

// новое св-во
clearValidation(popupProfileEdit, validationConfig)

  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileDescription.textContent;

  openModal(popupProfileEdit);
});

// Функция редактирования данных профиля

function handleUserFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                         
    // новое св-во
    clearValidation(popupProfileEdit, validationConfig); 
    
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

  clearValidation(popupAddNewCard, validationConfig);

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
  
// Валидация форм

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
// }; 

// const formSelector = document.querySelectorAll('.popup__form')
// const submitButtonSelector = formSelector.querySelectorAll('.popup__button')
// const inactiveButtonClass = formSelector.querySelectorAll('popup__button_disabled')
// const inputErrorClass = formSelector.querySelectorAll('popup__input_type_error')
// const errorClass = formSelector.querySelectorAll('popup__error_visible')
// const formError = formSelector.querySelector(`.${inputElement.id}-error`);

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('form__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('form__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };


// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('popup__button')
//   toggleButtonState(inputList, buttonElement)
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement)
//     });
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }; 

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)){
//     buttonElement.disabled = true;
//     buttonElement.classList.add('.popup__button_disabled');
//     } else {
//   buttonElement.disabled = false;
//   buttonElement.classList.remove('.popup__button_disabled');}
// }

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'))
//     fieldsetList.forEach((fieldSet) => {
//     setEventListeners(fieldSet);
//     })
//   });
// };

// enableValidation();


const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const showInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    console.log(`Adding error class to ${inputElement.id}`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationConfig.errorClass);
  } else {
    console.log('Element not found!');
  }
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    console.log(`Removing error class from ${inputElement.id}`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  }
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

  if (hasInvalidInput) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
};

enableValidation(validationConfig);
clearValidation(popupProfileEdit, validationConfig);