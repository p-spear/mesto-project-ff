import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards';
import { openModal } from './components/modal';
import { closeModal } from './components/modal';
import { addListenerToPopup } from './components/modal';

const cardsTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

editButton.addEventListener('click', function() {
  openModal(editProfilePopup)
});
addButton.addEventListener('click', function() {
  openModal(newCardPopup)
});
cardsContainer.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__image')) {
    const imagePopup = cardPopup.querySelector('.popup__image');
    imagePopup.src = evt.target.src;
    imagePopup.alt = evt.target.alt; 
    openModal(cardPopup);
  }
});

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard);
  cardsContainer.append(card);
});

function createCard(dataCard, deleteCard) {
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

/* function handleEscKeyUp(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function openModal(modal) {
  modal.classList.add('popup_is-opened'); // добавить класс открытия попапа
  document.addEventListener('keydown', handleEscKeyUp); // добавить слушатель на кнопку Escape
};

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened'); // удалить класс открытия попапа
  document.removeEventListener('keydown', handleEscKeyUp); // удалить слушатель на кнопку Escape
};

export function addListenerToPopup(elem) {
  const cross = elem.querySelector('.popup__close'); // ищем кнопку крестик в попапе
  cross.addEventListener("click", function() {
  closeModal(elem);
  });
  
  elem.addEventListener('mousedown', function(event) {
    if(event.target.classList.contains('popup')) {// если event.target содержит класс "popup", то закрываем
      closeModal(event.target);
    }
  });
} */

addListenerToPopup(editProfilePopup);
addListenerToPopup(newCardPopup);
addListenerToPopup(cardPopup);