export {openModal, closeModal, popupProfileEdit, popupAddNewCard, openImagePopup}


const popupCloseBtn = document.querySelectorAll('.popup__close')// Кнопка закрытия модалки
const popupProfileEdit = document.querySelector('.popup_type_edit')
const popupAddNewCard = document.querySelector('.popup_type_new-card')// Модальное окно добавления карточки
const openImagePopup = document.querySelector('.popup_type_image');


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