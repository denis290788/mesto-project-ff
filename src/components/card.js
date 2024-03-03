import { cardTemplate, showCardImage } from '../index.js';
import { addLike, deleteLike } from '../api.js';

// Функция создания карточки
const createCard = (item, userId, handleDeleteButton, likeCard, showCardImage) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like-counter').textContent = item.likes.length;

    console.log(item.owner._id);

    if (userId !== item.owner._id) {
        cardElement.querySelector('.card__delete-button').style.display = 'none';
    } else {
        cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
            handleDeleteButton(item);
            removeCard(evt.target);
        });
    }

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        if (item.likes.some((like) => like._id === userId)) {
            likeCard(evt.target);
            deleteLike(item._id)
                .then((item) => {
                    cardElement.querySelector('.card__like-counter').textContent =
                        item.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            likeCard(evt.target);
            addLike(item._id)
                .then((item) => {
                    cardElement.querySelector('.card__like-counter').textContent =
                        item.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        showCardImage(evt.target);
    });

    return cardElement;
};

// Функция удаления элемента карточки
const removeCard = (targetElement) => targetElement.closest('.card').remove();

// Функция лайка карточки likeCard
const likeCard = (targetElement) => targetElement.classList.toggle('card__like-button_is-active');

export { createCard, removeCard, likeCard };
