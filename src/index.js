import './pages/index.css';
import { initialCards, createCard, deleteCard, openCard, like } from './components/cards';
import { openModal, closeModal, addListenerToPopup } from './components/modal';

const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

editButton.addEventListener('click', function() {
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

addButton.addEventListener('click', function() {
  openModal(newCardPopup);
});

cardsContainer.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__image')) {
    openCard(evt.target, cardPopup);
  }
});

cardsContainer.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    like(evt.target);
  }
});

profileForm.addEventListener('submit', handleEditFormSubmit); 

newCardForm.addEventListener('submit', handleAddFormSubmit); 

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard);
  cardsContainer.append(card);
});

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfilePopup);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newCardObject = {
      name: placeInput.value,
      link: linkInput.value
    };
    const newCard = createCard(newCardObject, deleteCard);
    cardsContainer.prepend(newCard);
    closeModal(newCardPopup);
    evt.target.reset();
}

addListenerToPopup(editProfilePopup);
addListenerToPopup(newCardPopup);
addListenerToPopup(cardPopup);