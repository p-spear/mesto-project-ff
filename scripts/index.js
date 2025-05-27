const cardsTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

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