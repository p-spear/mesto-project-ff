import { changeLike } from './api';

export const createCard = (dataCard, template, like, openImagePopup, onDeleteCard, ownerId) => {
  const cardElement = template.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.card__like-counter');
  const imageCard = cardElement.querySelector('.card__image');
  const isLiked = dataCard.likes.map((card) => card._id).includes(ownerId); 
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;

  if(ownerId === dataCard.owner._id) {
    deleteButton.addEventListener('click', function() {
      onDeleteCard(dataCard._id, cardElement);
      //deleteCard(cardElement, dataCard._id);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  buttonLikeCard.addEventListener('click', function(evt) {
    like(evt.target, likesCounter, dataCard._id, ownerId);
  });

  imageCard.addEventListener('click', function(evt) {
      openImagePopup(evt.target);
  });

  renderLikes(buttonLikeCard, likesCounter, dataCard.likes.length, isLiked);

  return cardElement;
}

/* export const deleteCard = (cardElement, cardId) => {
  deleteCardFromServer(cardId)
  .then((result) => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err);
  });
} */

export const like = (icon, likesCounter, cardId, ownerId) => {
  changeLike(cardId, icon.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT')
  .then((data) => {
    renderLikes(icon, likesCounter, data.likes.length, data.likes.map((card) => card._id).includes(ownerId));
  })
  .catch((err) => {
    console.log(err);
  });
}

const renderLikes = (buttonLikeCard, likesCounter, numberOfLikes, isLiked) => {
  buttonLikeCard.classList.toggle('card__like-button_is-active', isLiked);
  likesCounter.textContent = numberOfLikes;
}
 