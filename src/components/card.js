import { deleteCardFromServer, changeLike } from './api';

export function createCard(dataCard, template, deleteCard, like, openImagePopup, isOwnerId) {
  const cardElement = template.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.card__like-counter');
  const imageCard = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;
  likesCounter.textContent = dataCard.likes.length;

  if(isOwnerId === undefined || isOwnerId === dataCard.owner._id) {
    deleteButton.addEventListener('click', function() {
      deleteCard(cardElement, dataCard._id);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  buttonLikeCard.addEventListener('click', function(evt) {
    like(evt.target, likesCounter, dataCard._id);
  });

  imageCard.addEventListener('click', function(evt) {
      openImagePopup(evt.target);
  });

  return cardElement;
}

export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
  .then((result) => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

export function like(icon, likesCounter, cardId) {
  //const method = icon.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';
  changeLike(cardId, icon.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT')
  .then((data) => {
    icon.classList.toggle('card__like-button_is-active');
    likesCounter.textContent = data.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}