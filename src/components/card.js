import { cardTemplate, showCardImage } from '../index.js';

// Функция создания карточки
const createCard = (card, userId, handleDeleteButton, handleLikeButton, showCardImage) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__like-counter').textContent = card.likes.length;

    //проверяем кем создана карточка, затем отображаем (добавляем обработчик события) или скрываем кнопку удаления карточки
    if (userId !== card.owner._id) {
        cardElement.querySelector('.card__delete-button').remove();
    } else {
        cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
            handleDeleteButton(card);
            evt.target.closest('.card').remove();
        });
    }

    //проверяем ставил или нет пользователь лайк по карточке
    if (card.likes.some((like) => like._id === userId)) {
        cardElement
            .querySelector('.card__like-button')
            .classList.add('card__like-button_is-active');
    } else {
        cardElement
            .querySelector('.card__like-button')
            .classList.remove('card__like-button_is-active');
    }

    //добавляем обработчик события по клику на лайк
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        handleLikeButton(card, userId)
            .then((card) => {
                cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
                evt.target.classList.toggle('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err);
            });
    });

    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        showCardImage(evt.target);
    });

    return cardElement;
};

export { createCard };
