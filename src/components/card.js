import { cardTemplate } from "../index.js";
import { openModal } from "./modal.js";

// Функция создания карточки
const createCard = (item, removeCard, likeCard, showCardImage) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;

    cardElement.querySelector(".card__delete-button").addEventListener("click", function (evt) {
        removeCard(evt.target);
    });

    cardElement.querySelector(".card__like-button").addEventListener("click", function (evt) {
        likeCard(evt.target);
    });

    cardElement.querySelector(".card__image").addEventListener("click", function (evt) {
        showCardImage(evt.target);
    });

    return cardElement;
};

// Функция удаления карточки
const removeCard = (targetElement) => targetElement.closest(".card").remove();

// Функция лайка карточки likeCard
const likeCard = (targetElement) => targetElement.classList.toggle("card__like-button_is-active");

// Функция открытия popup с картинкой карточки
const showCardImage = (targetElement) => {
    const popupImage = document.querySelector(".popup_type_image");
    popupImage.querySelector(".popup__image").src = targetElement.src;
    popupImage.querySelector(".popup__caption").textContent = targetElement.alt;
    openModal(popupImage);
};

export { createCard, removeCard, likeCard, showCardImage };
