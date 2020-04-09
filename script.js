const editButton = document.querySelector('.profile__edit-button');

function openPopup() {
  //Открытие окна и запись текущих значений
  const popup = document.querySelector('.popup');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const popupInputItem = popup.querySelectorAll('.popup__input-item');
  popupInputItem[0].value = profileName.textContent;
  popupInputItem[1].value = profileDescription.textContent;
  popup.classList.add('popup_opened');
  document.body.style.overflow = 'hidden';

  //Закрытие окна без сохранения изменений
  const closeButton = document.querySelector('.popup__close-button');

  function closePopup() {
    popup.classList.remove('popup_opened');
    document.body.style.overflow = 'visible';
  }

  closeButton.addEventListener('click', closePopup);

  //Сохранение введённых данных и обновление их на странице
  const formElement = popup.querySelector('.popup__container');

  function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInput = formElement.querySelectorAll('.popup__input-item')[0];
    const jobInput = formElement.querySelectorAll('.popup__input-item')[1];

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
  }

  formElement.addEventListener('submit', formSubmitHandler);
}

editButton.addEventListener('click', openPopup);
