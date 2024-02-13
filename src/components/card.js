import { cardTemplate } from "../index.js";

// @todo: Функция создания карточки
const createCard = (item, removeCard, likeCard) => {
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

    return cardElement;
};

// @todo: Функция удаления карточки
const removeCard = (targetElement) => targetElement.closest(".card").remove();

// @todo: Функция лайка карточки likeCard
const likeCard = (targetElement) => targetElement.classList.toggle("card__like-button_is-active");

export { createCard, removeCard, likeCard };
