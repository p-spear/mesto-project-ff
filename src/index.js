import './pages/index.css';
import { createCard, like } from './components/card';
import { openModal, closeModal, addListenerToPopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getProfileData, getInitialCards, postProfileData, postNewCardData, postAvatar, deleteCardFromServer, checkAvatar } from './components/api';

const cardsContainer = document.querySelector('.places__list');
const cardsTemplate = document.querySelector('#card-template').content;
const buttonOpenPopupEditAvatar = document.querySelector('.profile__image_container');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const popupEditAvatar = document.querySelector('.popup_type_update-avatar');
const popupSureDelete = document.querySelector('.popup_type_sure');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupFullImage = document.querySelector('.popup_type_image');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupFullImage = popupFullImage.querySelector('.popup__image');
const captionPopupFullImage = popupFullImage.querySelector('.popup__caption');
const formEditAvatar = document.forms['update-avatar'];
const formSureDelete = document.forms['sure-popup'];
const formProfile = document.forms['edit-profile'];
const formAddNewCard = document.forms['new-place'];
const inputAvatarLink = document.querySelector('.popup__input_type_avatar');
const inputProfileTitle = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_description');
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
let cardForDelete = {};

const openImagePopup = (card) => {
  imagePopupFullImage.src = card.src;
  imagePopupFullImage.alt = card.alt; 
  captionPopupFullImage.textContent = card.alt; 
  openModal(popupFullImage);
}

const onDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    cardId: cardId,
    cardElement: cardElement
  }
  openModal(popupSureDelete);
}

const handleEditAvatartFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(evt.target.elements.button, true);
  postAvatar(inputAvatarLink.value)
  .then((data) => {
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
    closeModal(popupEditAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.target.elements.button, false);
  });
} 

const handleSureDeleteFormSubmit = (evt) => {
	evt.preventDefault();
  if (!cardForDelete.cardElement) return;
	deleteCardFromServer(cardForDelete.cardId)
  .then(() => {
    cardForDelete.cardElement.remove();
    closeModal(popupSureDelete);
    cardForDelete = {};
  })
  .catch((err) => {
    console.log(err);
  });
}

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(evt.target.elements.button, true);
  postProfileData(inputProfileTitle.value, inputProfileDescription.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(popupEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.target.elements.button, false);
  });
}

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(evt.target.elements.button, true);
  postNewCardData(inputPlaceNameNewCard.value, inputLinkImageNewCard.value)
  .then((newCardObject) => {
    const newCard = createCard(newCardObject, cardsTemplate, like, openImagePopup, onDeleteCard, newCardObject.owner._id);
    cardsContainer.prepend(newCard);
    closeModal(popupNewCard);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.target.elements.button, false);
    clearValidation(formAddNewCard, validationConfig);
  });
}

const renderLoading = (button, isLoading) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

Promise.all([getProfileData(), getInitialCards()])
.then(([profileData, cardsData]) => {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
  cardsData.forEach((item) => {
    const card = createCard(item, cardsTemplate, like, openImagePopup, onDeleteCard, profileData._id);
    cardsContainer.append(card);
  });
})
.catch((err) => {
  console.log(err);
});

buttonOpenPopupEditAvatar.addEventListener('click', function() {
  formEditAvatar.elements.avatar.value = '';
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});

buttonOpenPopupProfile.addEventListener('click', function() {
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDescription.textContent;
  clearValidation(formProfile, validationConfig);
  openModal(popupEditProfile);
});

buttonOpenPopupAddNewCard.addEventListener('click', function() {
  openModal(popupNewCard);
});

formEditAvatar.addEventListener('submit', handleEditAvatartFormSubmit); 

formSureDelete.addEventListener('submit', handleSureDeleteFormSubmit); 

formProfile.addEventListener('submit', handleEditFormSubmit); 

formAddNewCard.addEventListener('submit', handleAddFormSubmit); 

addListenerToPopup(popupEditAvatar);

addListenerToPopup(popupSureDelete);

addListenerToPopup(popupEditProfile);

addListenerToPopup(popupNewCard);

addListenerToPopup(popupFullImage);

enableValidation(validationConfig);