import "../pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const profileForm = document.forms[0];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const newCardForm = document.forms[1];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
for (let card of initialCards) {
    placesList.append(createCard(card, removeCard, likeCard));
}

// @todo: обработчики событий для открытия модальных окон
document.querySelector(".profile__edit-button").addEventListener("click", function () {
    nameInput.value = document.querySelector(".profile__title").textContent;
    jobInput.value = document.querySelector(".profile__description").textContent;
    openModal(popupEdit);
});
document.querySelector(".profile__add-button").addEventListener("click", function () {
    openModal(popupNewCard);
});

// @todo: обработчики событий для закрытия модальных окон
popupEdit.querySelector(".popup__close").addEventListener("click", function () {
    closeModal(popupEdit);
    profileForm.reset();
});
popupNewCard.querySelector(".popup__close").addEventListener("click", function () {
    closeModal(popupNewCard);
    newCardForm.reset();
});

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
    placesList.prepend(createCard(newCard, removeCard, likeCard));
    newCardForm.reset();
    closeModal(evt.target.closest(".popup"));
}

profileForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", handleCardSubmit);

export { cardTemplate };
