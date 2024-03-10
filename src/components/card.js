// Функция создания карточки
export const createCard = (
    card,
    userId,
    cardTemplate,
    handleDeleteButton,
    handleLikeButton,
    showCardImage
) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    cardLikeCounter.textContent = card.likes.length;

    //проверяем кем создана карточка, затем отображаем (добавляем обработчик события) или скрываем кнопку удаления карточки
    if (userId !== card.owner._id) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', (evt) => {
            handleDeleteButton(card)
                .then(() => {
                    removeCardTemplate(evt.target);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    //проверяем ставил или нет пользователь лайк по карточке
    if (card.likes.some((like) => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }

    //добавляем обработчик события по клику на лайк
    cardLikeButton.addEventListener('click', function (evt) {
        handleLikeButton(card, userId)
            .then((card) => {
                cardLikeCounter.textContent = card.likes.length;
                evt.target.classList.toggle('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err);
            });
    });

    cardImage.addEventListener('click', function () {
        showCardImage(card);
    });

    return cardElement;
};

export const removeCardTemplate = (cardElement) => {
    cardElement.closest('.card').remove();
};
