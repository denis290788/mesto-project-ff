import "../pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard, showCardImage } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const profileForm = document.forms[0];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const newCardForm = document.forms[1];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// DOM узлы
const placesList = document.querySelector(".places__list");

// Вывести карточки на страницу
for (let card of initialCards) {
    placesList.append(createCard(card, removeCard, likeCard, showCardImage));
}

// обработчики событий для открытия модальных окон
document.querySelector(".profile__edit-button").addEventListener("click", () => {
    nameInput.value = document.querySelector(".profile__title").textContent;
    jobInput.value = document.querySelector(".profile__description").textContent;
    openModal(popupEdit);
});
document.querySelector(".profile__add-button").addEventListener("click", () => {
    openModal(popupNewCard);
});

// обработчики событий для закрытия модальных окон по клику на Х
popupEdit.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(popupEdit);
    profileForm.reset();
});
popupNewCard.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(popupNewCard);
    newCardForm.reset();
});
popupImage.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(popupImage);
});

// функции отправки форм для редактирования профиля и добавления карточек
function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent = jobInput.value;
    profileForm.reset();
    closeModal(evt.target.closest(".popup"));
}

function handleCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    placesList.prepend(createCard(newCard, removeCard, likeCard, showCardImage));
    newCardForm.reset();
    closeModal(evt.target.closest(".popup"));
}

// обработчики отправки форм для редактирования профиля и добавления карточек
profileForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", handleCardSubmit);

export { cardTemplate };
