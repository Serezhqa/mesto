const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popup.querySelectorAll('.popup__input-item')[0];
const jobInput = popup.querySelectorAll('.popup__input-item')[1];
const closeButton = document.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__container');

//Открытие либо закрытие попапа
function togglePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
  }
}

//Сохранение введённых данных и обновление их на странице
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
