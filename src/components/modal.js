/* const editButton = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.popup_type_new-card');
const card = document.querySelector('.popup_type_image'); */

function handleEscKeyUp(e) {
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
      console.dir;
      closeModal(event.target);
    }
  });
}

/* addListenerToPopup(editButton);
addListenerToPopup(addButton);
addListenerToPopup(card); */