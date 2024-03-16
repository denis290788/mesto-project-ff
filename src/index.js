import '../pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
    getUserProfile,
    getInitialCards,
    editProfile,
    addCard,
    deleteCard,
    deleteLike,
    addLike,
    uploadAvatar,
} from './components/api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupImage = document.querySelector('.popup_type_image');

const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const newCardForm = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

const newAvatarForm = document.forms['new-avatar'];
const avatarInput = document.querySelector('.popup__input_type_url_avatar');

const placesList = document.querySelector('.places__list');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

// Функция открытия popup с картинкой карточки
const popupImageLarge = popupImage.querySelector('.popup__image');
const popupImagecaption = popupImage.querySelector('.popup__caption');

const showCardImage = (card) => {
    popupImageLarge.src = card.link;
    popupImageLarge.alt = card.name;
    popupImagecaption.textContent = card.name;
    openModal(popupImage);
};

// обработчики событий для открытия модальных окон
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
    clearValidation(profileForm, validationConfig);
    profileForm.reset();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
});

// обработчик событий для открытия формы добавления новой карточки
const newCardButton = document.querySelector('.profile__add-button');

newCardButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
    newCardForm.reset();
    openModal(popupNewCard);
});

// обработчик событий для открытия формы редактирования аватарки
const newAvatarButton = document.querySelector('.profile__image');

newAvatarButton.addEventListener('click', () => {
    clearValidation(newAvatarForm, validationConfig);
    newAvatarForm.reset();
    openModal(popupNewAvatar);
});

// обработчики событий для закрытия модальных окон по клику на Х
const buttonCloseList = document.querySelectorAll('.popup__close');

buttonCloseList.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(popup));
});

let userId;

// функция отправки формы для редактирования профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, true);
    editProfile(nameInput.value, jobInput.value)
        .then((profile) => {
            profileTitle.textContent = profile.name;
            profileDescription.textContent = profile.about;
            closeModal(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(evt.submitter, false));
}

// функция отправки формы для добавления карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, true);
    addCard(cardNameInput.value, cardLinkInput.value)
        .then((card) => {
            placesList.prepend(
                createCard(
                    {
                        name: card.name,
                        link: card.link,
                        likes: [],
                        owner: { _id: userId },
                        _id: card._id,
                    },
                    userId,
                    cardTemplate,
                    handleDeleteButton,
                    handleLikeButton,
                    showCardImage
                )
            );
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(evt.submitter, false));
}

//функция удаления карточки со страницы
function handleDeleteButton(card) {
    return deleteCard(card._id);
}

//функция добавления/удаления лайка
function handleLikeButton(card, isLiked) {
    if (isLiked) {
        return deleteLike(card._id);
    } else {
        return addLike(card._id);
    }
}

//функция загрузки аватарки
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, true);
    uploadAvatar(avatarInput.value)
        .then((user) => {
            document.querySelector(
                '.profile__image'
            ).style.backgroundImage = `url('${user.avatar}')`;
            closeModal(popupNewAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(evt.submitter, false));
}

//функция отображения загрузки
function renderLoading(element, isLoading) {
    if (isLoading) {
        element.textContent = 'Сохранение...';
    } else {
        element.textContent = 'Сохранить';
    }
}

// загружаем на страницу информацию о пользователе и карточки
Promise.all([getUserProfile(), getInitialCards()])
    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        newAvatarButton.style.backgroundImage = `url('${user.avatar}')`;

        cards.forEach((card) => {
            placesList.append(
                createCard(
                    card,
                    user._id,
                    cardTemplate,
                    handleDeleteButton,
                    handleLikeButton,
                    showCardImage
                )
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });

// обработчики отправки форм для редактирования профиля и добавления карточек
profileForm.addEventListener('submit', handleProfileSubmit);
newCardForm.addEventListener('submit', handleCardSubmit);
newAvatarForm.addEventListener('submit', handleAvatarSubmit);

// включаем валидацию
enableValidation(validationConfig);
