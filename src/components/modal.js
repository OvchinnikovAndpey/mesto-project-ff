export {openModal, closeEsc, closeOverlay, closeModal}

// Кнопка закрытия модалки
const popupCloseBtn = document.querySelectorAll('.popup__close')

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
  