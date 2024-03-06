import '../pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './validation.js';
import {
    getUserProfile,
    getInitialCards,
    editProfile,
    addCard,
    deleteCard,
    deleteLike,
    addLike,
    uploadAvatar,
} from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const newCardForm = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

const newAvatarForm = document.forms['new-avatar'];
const avatarInput = document.querySelector('.popup__input_type_url_avatar');

const placesList = document.querySelector('.places__list');

// Функция открытия popup с картинкой карточки
const showCardImage = (targetElement) => {
    popupImage.querySelector('.popup__image').src = targetElement.src;
    popupImage.querySelector('.popup__image').alt = targetElement.alt;
    popupImage.querySelector('.popup__caption').textContent = targetElement.alt;
    openModal(popupImage);
};

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

document.querySelector('.profile__image').addEventListener('click', () => {
    clearValidation(newAvatarForm, validationConfig);
    newAvatarForm.reset();
    openModal(popupNewAvatar);
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
popupNewAvatar.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupNewAvatar);
});

let userId;

// функция отправки формы для редактирования профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    renderLoading(document.querySelector('.edit-profile__button'), true);
    editProfile(nameInput.value, jobInput.value)
        .then((profile) => {
            document.querySelector('.profile__title').textContent = profile.name;
            document.querySelector('.profile__description').textContent = profile.about;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(document.querySelector('.edit-profile__button'), false));

    closeModal(popupEdit);
}

// функция отправки формы для добавления карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(document.querySelector('.add-new-card__button'), true);
    addCard(cardNameInput.value, cardLinkInput.value)
        .then((card) => {
            placesList.prepend(
                createCard(
                    { name: card.name, link: card.link, likes: [], owner: { _id: userId } },
                    userId,
                    handleDeleteButton,
                    handleLikeButton,
                    showCardImage
                )
            );
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(document.querySelector('.add-new-card__button'), false));

    closeModal(popupNewCard);
}

function handleDeleteButton(card) {
    return deleteCard(card._id).catch((err) => {
        console.log(err);
    });
}

function handleLikeButton(card, userId) {
    if (card.likes.some((like) => like._id === userId)) {
        return deleteLike(card._id);
    } else {
        return addLike(card._id);
    }
}

function handleAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(document.querySelector('.update-avatar__button'), true);
    uploadAvatar(avatarInput.value)
        .then((user) => {
            document.querySelector(
                '.profile__image'
            ).style.backgroundImage = `url('${user.avatar}')`;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => renderLoading(document.querySelector('.update-avatar__button'), false));
    closeModal(popupNewAvatar);
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
    .then((result) => {
        const user = result[0];
        const cards = result[1];

        document.querySelector('.profile__title').textContent = user.name;
        document.querySelector('.profile__description').textContent = user.about;
        document.querySelector('.profile__image').style.backgroundImage = `url('${user.avatar}')`;

        cards.forEach((card) => {
            placesList.append(
                createCard(card, user._id, handleDeleteButton, handleLikeButton, showCardImage)
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

export { cardTemplate, showCardImage };
