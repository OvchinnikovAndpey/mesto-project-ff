export { openModal, closeModal }

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
      const openedModal = document.querySelector('.popup_is-opened');
      closeModal(openedModal);
    };
};
  

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
  popup.removeEventListener('click', closeOverlay)
}