function handleEscKeyUp(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

export function addListenerToPopup(elem) {
  const cross = elem.querySelector('.popup__close');
  cross.addEventListener("click", function() {
  closeModal(elem);
  });
  
  elem.addEventListener('mousedown', function(event) {
    if(event.target.classList.contains('popup')) {
      closeModal(event.target);
    }
  });
}