const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard);
  cardsList.append(card);
});

function createCard(dataCard, deleteCard) {
  const cardElement = cardsTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardElement.querySelector('.card__image').src = dataCard.link;
  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  }); 

  return cardElement;
}