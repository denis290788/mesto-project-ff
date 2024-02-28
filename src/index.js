import '../pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './validation.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const newCardForm = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

const placesList = document.querySelector('.places__list');

// Функция открытия popup с картинкой карточки
const showCardImage = (targetElement) => {
    popupImage.querySelector('.popup__image').src = targetElement.src;
    popupImage.querySelector('.popup__image').alt = targetElement.alt;
    popupImage.querySelector('.popup__caption').textContent = targetElement.alt;
    openModal(popupImage);
};

// Вывести карточки на страницу
for (let card of initialCards) {
    placesList.append(createCard(card, removeCard, likeCard, showCardImage));
}

// обработчики событий для открытия модальных окон
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    clearValidation(profileForm, validationConfig);
    profileForm.reset();
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(popupEdit);
});
document.querySelector('.profile__add-button').addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
    newCardForm.reset();
    openModal(popupNewCard);
});

// обработчики событий для закрытия модальных окон по клику на Х
popupEdit.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupEdit);
});
popupNewCard.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupNewCard);
});
popupImage.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupImage);
});

// функция отправки формы для редактирования профиля и добавления карточек
function handleProfileSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(popupEdit);
}

// функция отправки формы для добавления карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    placesList.prepend(createCard(newCard, removeCard, likeCard, showCardImage));
    closeModal(popupNewCard);
}

// обработчики отправки форм для редактирования профиля и добавления карточек
profileForm.addEventListener('submit', handleProfileSubmit);
newCardForm.addEventListener('submit', handleCardSubmit);

enableValidation(validationConfig);

export { cardTemplate, showCardImage };
