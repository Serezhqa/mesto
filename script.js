let editButton = document.querySelector('.profile__edit-button');

function openPopup() {
  let popup = document.querySelector('.popup');
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');
  let popupInputItem = popup.querySelectorAll('.popup__input-item');
  popupInputItem[0].value = profileName.textContent;
  popupInputItem[1].value = profileDescription.textContent;
  popup.classList.add('popup_opened');
  document.body.style.overflow = 'hidden';

  let closeButton = document.querySelector('.popup__close-button');

  function closePopup() {
    popup.classList.remove('popup_opened');
    document.body.style.overflow = 'visible';
  }

  closeButton.addEventListener('click', closePopup);
}

editButton.addEventListener('click', openPopup);
