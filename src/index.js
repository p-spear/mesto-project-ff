import './pages/index.css';
import { initialCards, createCard, deleteCard, like } from './components/cards';
import { openModal, closeModal, addListenerToPopup } from './components/modal';

const cardsContainer = document.querySelector('.places__list');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupFullImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupFullImage = popupFullImage.querySelector('.popup__image');
const captionPopupFullImage = popupFullImage.querySelector('.popup__caption');
const formProfile = document.forms['edit-profile'];
const formAddNewCard = document.forms['new-place'];
const inputProfileTitle = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_description');
const inputPlaceNameNewCard = document.querySelector('.popup__input_type_card-name');
const inputLinkImageNewCard = document.querySelector('.popup__input_type_url');

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
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newCardObject = {
      name: inputPlaceNameNewCard.value,
      link: inputLinkImageNewCard.value
    };
    const newCard = createCard(newCardObject, deleteCard, like, openImagePopup);
    cardsContainer.prepend(newCard);
    closeModal(popupNewCard);
    evt.target.reset();
}

buttonOpenPopupProfile.addEventListener('click', function() {
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

buttonOpenPopupAddNewCard.addEventListener('click', function() {
  openModal(popupNewCard);
});

formProfile.addEventListener('submit', handleEditFormSubmit); 

formAddNewCard.addEventListener('submit', handleAddFormSubmit); 

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, like, openImagePopup);
  cardsContainer.append(card);
});

addListenerToPopup(popupEditProfile);
addListenerToPopup(popupNewCard);
addListenerToPopup(popupFullImage);