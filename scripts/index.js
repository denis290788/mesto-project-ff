// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const creatCard = function (item, removeCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;

    cardElement.querySelector(".card__delete-button").addEventListener("click", function (evt) {
        removeCard(evt.target);
    });

    return cardElement;
};

// @todo: Функция удаления карточки
const removeCard = function (targetElement) {
    targetElement.parentElement.remove();
};

// @todo: Вывести карточки на страницу
for (let i = 0; i <= initialCards.length; i++) {
    placesList.append(creatCard(initialCards[i], removeCard));
}
