import { openModal } from './modal';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(dataCard, deleteCard, openCard, like) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardElement = cardsTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardElement.querySelector('.card__image').src = dataCard.link;
  cardElement.querySelector('.card__image').alt = dataCard.name;
  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  }); 

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function openCard (card, popupContent) {
  const imagePopup = popupContent.querySelector('.popup__image');
  const imageCaption = popupContent.querySelector('.popup__caption');
  
  imagePopup.src = card.src;
  imagePopup.alt = card.alt; 
  imageCaption.textContent = card.alt; 
  openModal(popupContent);
}

export function like (card) {
  if (card.classList.contains('card__like-button_is-active')) {
    card.classList.remove('card__like-button_is-active');
  } else {
    card.classList.add('card__like-button_is-active');
  }
}