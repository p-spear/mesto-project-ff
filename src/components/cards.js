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

export function createCard(dataCard, template, deleteCard, like, openImagePopup) {
  const cardElement = template.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
  const imageCard = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;

  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  }); 

  buttonLikeCard.addEventListener('click', function(evt) {
    like(evt.target);
  });

  imageCard.addEventListener('click', function(evt) {
      openImagePopup(evt.target);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function like(icon) {
  icon.classList.toggle('card__like-button_is-active'); 
}