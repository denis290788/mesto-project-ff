// Функция открытия модального окна openModal
const openModal = (modalElement) => {
    modalElement.classList.add('popup_is-opened');

    // при открытии popup добавляем обработчик события при нажатии Esc
    document.addEventListener('keydown', closePopupByEsc);

    // при открытии popup добавляем обработчик события при клике по оверлэю
    modalElement.addEventListener('click', closePopupByOverlay);
};

// Функция закрытия модального окна closeModal
const closeModal = (modalElement) => {
    document.removeEventListener('keydown', closePopupByEsc);
    modalElement.removeEventListener('click', closePopupByOverlay);
    modalElement.classList.remove('popup_is-opened');
};

// Функция закрытия popup при нажатии Esc (для снятия листенера)
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

// Функция закрытия popup при клике по оверлею (для снятия листенера)
const closePopupByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
};

export { openModal, closeModal };
