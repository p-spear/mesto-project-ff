import './pages/index.css';
import { initialCards} from './components/cards';
import { createCard, deleteCard, like } from './components/card';
import { openModal, closeModal, addListenerToPopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getProfileData, getInitialCards, postProfileData } from './components/api';

const cardsContainer = document.querySelector('.places__list');
const cardsTemplate = document.querySelector('#card-template').content;
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
/* const buttonSubmitPopupNewCard = popupNewCard.querySelector('.popup__button'); */
const popupFullImage = document.querySelector('.popup_type_image');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupFullImage = popupFullImage.querySelector('.popup__image');
const captionPopupFullImage = popupFullImage.querySelector('.popup__caption');
const formProfile = document.forms['edit-profile'];
const formAddNewCard = document.forms['new-place'];
const inputProfileTitle = document.querySelector('.popup__input_type_name');
//const inputProfileTitleError = formProfile.querySelector(`.${inputProfileTitle.id}-error`);
const inputProfileDescription = document.querySelector('.popup__input_type_description');
//const inputProfileDescriptionError = formProfile.querySelector(`.${inputProfileDescription.id}-error`);
const inputPlaceNameNewCard = document.querySelector('.popup__input_type_card-name');
const inputLinkImageNewCard = document.querySelector('.popup__input_type_url');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}

function openImagePopup (card) {
  imagePopupFullImage.src = card.src;
  imagePopupFullImage.alt = card.alt; 
  captionPopupFullImage.textContent = card.alt; 
  openModal(popupFullImage);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputProfileTitle.value;
    profileDescription.textContent = inputProfileDescription.value;
    closeModal(popupEditProfile);
    postProfileData(inputProfileTitle.value, inputProfileDescription.value);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newCardObject = {
      name: inputPlaceNameNewCard.value,
      link: inputLinkImageNewCard.value
    };
    const newCard = createCard(newCardObject, cardsTemplate, deleteCard, like, openImagePopup);
    cardsContainer.prepend(newCard);
    closeModal(popupNewCard);
    evt.target.reset();
    clearValidation(formAddNewCard, validationConfig);
}

buttonOpenPopupProfile.addEventListener('click', function() {
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDescription.textContent;
  clearValidation(formProfile, validationConfig);
  openModal(popupEditProfile);
});

buttonOpenPopupAddNewCard.addEventListener('click', function() {
  openModal(popupNewCard);
});

formProfile.addEventListener('submit', handleEditFormSubmit); 

formAddNewCard.addEventListener('submit', handleAddFormSubmit); 

Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
    console.log(cardsData);
    cardsData.forEach(function (item) {
      const card = createCard(item, cardsTemplate, deleteCard, like, openImagePopup);
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

addListenerToPopup(popupEditProfile);

addListenerToPopup(popupNewCard);

addListenerToPopup(popupFullImage);

enableValidation(validationConfig);