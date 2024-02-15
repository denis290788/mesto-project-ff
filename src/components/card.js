import { cardTemplate, showCardImage } from '../index.js';

// Функция создания карточки
const createCard = (item, removeCard, likeCard, showCardImage) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        removeCard(evt.target);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        likeCard(evt.target);
    });

    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        showCardImage(evt.target);
    });

    return cardElement;
};

// Функция удаления карточки
const removeCard = (targetElement) => targetElement.closest('.card').remove();

// Функция лайка карточки likeCard
const likeCard = (targetElement) => targetElement.classList.toggle('card__like-button_is-active');

export { createCard, removeCard, likeCard };
