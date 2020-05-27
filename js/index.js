import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Для попапа "Редактировать профиль"
const editInfoPopup = document.querySelector('.popup_type_edit-info');
const editInfoForm = editInfoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editInfoPopup.querySelector('.popup__input_type_username');
const descriptionInput = editInfoPopup.querySelector('.popup__input_type_description');

//Для попапа "Новое место"
const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPhotoPopup.querySelector('.popup__form');
const placeInput = addPhotoPopup.querySelector('.popup__input_type_place');
const linkInput = addPhotoPopup.querySelector('.popup__input_type_link');

//Для попапа с увеличенным фото
const openPhotoPopup = document.querySelector('.popup_type_open-photo');
const photo = openPhotoPopup.querySelector('.popup__image');
const heading = openPhotoPopup.querySelector('.popup__heading');

//Все кнопки открытия форм
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Для валидации форм
const editInfoFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  textErrorClass: 'popup__input-error_visible'
}, editInfoForm);
const addPhotoFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  textErrorClass: 'popup__input-error_visible'
}, addPhotoForm);

//Для начальной загрузки фотографий
const elements = document.querySelector('.elements');
const initialCards = [
  {
      name: 'Милан',
      link: 'images/Milan.jfif'
  },
  {
      name: 'Верона',
      link: 'images/Verona.jfif'
  },
  {
      name: 'Помпеи',
      link: 'images/Pompei.jfif'
  },
  {
      name: 'Сицилия',
      link: 'images/Sicily.jfif'
  },
  {
      name: 'Флоренция',
      link: 'images/Florence.jfif'
  },
  {
      name: 'Рим',
      link: 'images/Rome.jfif'
  }
];



//Отрисовка начальных карточек
function renderInitialCards(arr) {
  arr.forEach(item => {
    let card = new Card(item, '#card-template').createCard();
    elements.append(card);
  });
}

//Закрытие нажатием на крестик
function closeButtonHandler(evt) {
  togglePopup(evt.target.closest('.popup'));
}

//Закрытие нажатием вне формы
function overlayClickHandler(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup(evt.currentTarget);
  }
}

//Закрытие нажатием Esc
function overlayEscHandler(evt) {
  if (evt.key === 'Escape') {
    togglePopup(document.querySelector('.popup_opened'));
  }
}

//Открытие и закрытие форм
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    popup.querySelector('.popup__close-button').addEventListener('click', closeButtonHandler);
    popup.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', overlayEscHandler);
  } else {
    popup.querySelector('.popup__close-button').removeEventListener('click', closeButtonHandler);
    popup.removeEventListener('click', overlayClickHandler);
    document.removeEventListener('keydown', overlayEscHandler);
  }
}

/*Для клика по картинке
(если кликать мышкой, то evt.target - это img,
а если через TAB и пробел/Enter, то evt.target - это button,
поэтому рассматриваю оба случая*/
function openImage(evt) {
  if (evt.target.classList.contains('elements__image')) {
    photo.src = evt.target.src;
    photo.alt = evt.target.alt;
    heading.textContent = evt.target.alt;
    togglePopup(openPhotoPopup);
  } else if (evt.target.classList.contains('elements__image-button')) {
    photo.src = evt.target.firstElementChild.src;
    photo.alt = evt.target.firstElementChild.alt;
    heading.textContent = evt.target.firstElementChild.alt;
    togglePopup(openPhotoPopup);
  }
}

//Для очистки ошибок, оставшихся с предыдущего заполнения формы
function clearErrors(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach(input => {
    if (input.classList.contains('popup__input_type_error')) {
    input.classList.remove('popup__input_type_error');
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_visible');
    }
  });
}

//Для отключения кнопки при открытии формы
function disableButton(form) {
  const submitButton = form.querySelector('.popup__save-button');
  submitButton.classList.add('popup__save-button_disabled');
  submitButton.setAttribute('disabled', true);
}

//Для открытия формы "Редактировать профиль" с автозаполнением имеющихся данных
function openEditInfoForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  //Возможна ситуация, что пользователь ввёл невалидные значения и закрыл окно. Тогда при следующем открытии формы
  //подтянутся валидные значения (две строчки выше), но текст ошибки останется. Исправим это:
  clearErrors(editInfoForm);
  //Отключаем кнопку - незачем сохранять данные, которые пока не изменились
  disableButton(editInfoForm);
  togglePopup(editInfoPopup);
}

//Для открытия формы добавления фото
function openAddPhotoForm() {
  //При каждом открытии очищаем поля, если вдруг там уже что-то было
  placeInput.value = '';
  linkInput.value = '';
  //И убираем ошибки, если они были
  clearErrors(addPhotoForm);
  //Т.к. при открытии поля пустые, отключаем кнопку
  disableButton(addPhotoForm);
  togglePopup(addPhotoPopup);
}

//Для сохранения введённых в форму "Редактировать профиль" данных и обновления их на странице
function editInfoFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  togglePopup(editInfoPopup);
}

//Для создания новой карточки и добавления её на страницу
function addPhotoFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Card({
    name: placeInput.value,
    link: linkInput.value
  }, '#card-template').createCard();
  elements.prepend(card);
  togglePopup(addPhotoPopup);
}



//Слушатели событий
editButton.addEventListener('click', openEditInfoForm);
addButton.addEventListener('click', openAddPhotoForm);
elements.addEventListener('click', openImage);
editInfoForm.addEventListener('submit', editInfoFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotoFormSubmitHandler);



//Создание начальных карточек
renderInitialCards(initialCards);

//Запуск валидации форм
editInfoFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();
