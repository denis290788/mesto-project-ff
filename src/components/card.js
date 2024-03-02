import { cardTemplate, showCardImage } from '../index.js';
import { deleteCard } from '../api.js';

// Функция создания карточки
const createCard = (item, ownerId, removeCard, likeCard, showCardImage) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like-counter').textContent = item.likes.length;

    if (item.owner._id === ownerId) {
        cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
            deleteCard(item._id)
                .then(() => {
                    removeCard(evt.target);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    } else {
        cardElement.querySelector('.card__delete-button').style.display = 'none';
    }

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
