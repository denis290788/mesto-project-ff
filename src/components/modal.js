// Функция открытия модального окна openModal
const openModal = (modalElement) => {
    modalElement.classList.add("popup_is-opened");

    // при открытии popup добавляем обработчик события при нажатии Esc
    document.addEventListener("keydown", function (evt) {
        if (evt.key === "Escape") {
            closeModal(modalElement);
        }
    });

    // при открытии popup добавляем обработчик события при клике по оверлэю
    modalElement.addEventListener("click", function (evt) {
        if (evt.target === modalElement) {
            closeModal(modalElement);
        }
    });
};

// Функция закрытия модального окна closeModal
const closeModal = (modalElement) => {
    modalElement.classList.remove("popup_is-opened");
};

export { openModal, closeModal };
