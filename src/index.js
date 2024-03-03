import '../pages/index.css';
import { createCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './validation.js';
import { getUserProfile, getInitialCards, editProfile, addCard, deleteCard } from './api.js';

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

let userId;
// загружаем на страницу информацию о пользователе и карточки
Promise.all([getUserProfile(), getInitialCards()])
    .then((result) => {
        document.querySelector('.profile__title').textContent = result[0].name;
        document.querySelector('.profile__description').textContent = result[0].about;
        document.querySelector(
            '.profile__image'
        ).style.backgroundImage = `url('${result[0].avatar}')`;

        userId = result[0]._id;

        result[1].forEach((card) => {
            placesList.append(
                createCard(card, userId, handleDeleteButton, likeCard, showCardImage)
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });

function handleDeleteButton(card) {
    return deleteCard(card._id).catch((err) => {
        console.log(err);
    });
}

// функция отправки формы для редактирования профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    editProfile(nameInput.value, jobInput.value)
        .then((profile) => {
            document.querySelector('.profile__title').textContent = profile.name;
            document.querySelector('.profile__description').textContent = profile.about;
        })
        .catch((err) => {
            console.log(err);
        });

    closeModal(popupEdit);
}

// функция отправки формы для добавления карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    addCard(cardNameInput.value, cardLinkInput.value)
        .then((card) => {
            placesList.prepend(
                createCard(
                    { name: card.name, link: card.link, likes: [], owner: { _id: userId } },
                    userId,
                    handleDeleteButton,
                    likeCard,
                    showCardImage
                )
            );
        })
        .catch((err) => {
            console.log(err);
        });

    closeModal(popupNewCard);
}

// обработчики отправки форм для редактирования профиля и добавления карточек
profileForm.addEventListener('submit', handleProfileSubmit);
newCardForm.addEventListener('submit', handleCardSubmit);

// включаем валидацию
enableValidation(validationConfig);

export { cardTemplate, showCardImage };
