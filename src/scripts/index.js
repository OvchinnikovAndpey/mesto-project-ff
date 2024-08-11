import '../pages/index.css';
import { createCard, deleteCard, handleLike } from '../components/card';
import { openModal, closeModal } from '../components/modal';

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
const profileImage = document.querySelector('.profile__image')

// @todo: Вывести карточки на страницу (не с сервера)

// initialCards.forEach(function(element) {
//   const cardElement = createCard(element, deleteCard, handleLike, openImage) 
//   placesList.append(cardElement)
// })

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
});Я

// Функция редактирования данных профиля

function handleUserFormSubmit(evt) {
    evt.preventDefault();                                        
    
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value 
    
    profileEditFunction(profileName.textContent, profileDescription.textContent)
      .then(() => {
        closeModal(popupProfileEdit);
      })
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

// АПИ

// const config = {
//   cardsUrl: "https://nomoreparties.co/v1/pwff-cohort-1/cards",
//   userDataUrl: "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
//   headers: {
//     authorization: "6529151b-a651-4db4-ad9e-59715b964e63",
//     "Content-Type": "application/json",
//   },
// };



  // .then(res => res.json())
  // .then((result) => {
  //   console.log(result);
  // }); 

// fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
// headers: {
//   authorization: '6529151b-a651-4db4-ad9e-59715b964e63'
// }
// })
// .then(res => res.json())
// .then((result) => {
//   console.log(result);
// }); 

// fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
// headers: {
//   authorization: '6529151b-a651-4db4-ad9e-59715b964e63'
// }
// })
// .then(res => res.json())
// .then((result) => {
//   console.log(result);
// }); 

// function handleResponse(response) {
//   if (response.ok) {
//     return response.json()
//   }

//   throw new Error('Данные не получены')
// } 


const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
      headers: {
        authorization: '6529151b-a651-4db4-ad9e-59715b964e63',
        'Content-Type': 'application/json'
      }
      })
    .then((res) => {
      if(res.ok) {
      return res.json()
      }    
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

const getUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
      headers: {
      authorization: '6529151b-a651-4db4-ad9e-59715b964e63',  
      'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

function getAddCardsAndInfo() {
  return Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    console.log({userData, cardsData})
  
    profileName.textContent = userData.name
    profileDescription.textContent = userData.about
    // для аватарки
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    // для аватарки
    const userId = userData._id

    cardsData.forEach((element) => {
      const newCard = createCard(element, deleteCard, handleLike, openImage)
      placesList.append(newCard)
    })
  })
  .catch((err) => {
    console.log(err)
  })

}

getAddCardsAndInfo()

const profileEditFunction = (inputName, inputDescription) => {
  fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me`, {
    headers: {
      authorization: '6529151b-a651-4db4-ad9e-59715b964e63',
      'Content-Type': 'application/json',
    },
    method: 'PATCH', 
    body: JSON.stringify({
      name: `${inputName}`,
      about: `${inputDescription}`,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

