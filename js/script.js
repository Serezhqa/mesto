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

//Все попапы и кнопки закрытия форм
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

//Для начальной загрузки фотографий
const cardTemplate = document.querySelector('#card-template').content;
const elements = document.querySelector('.elements');
const initialCards = [
  {
      name: 'Милан',
      link: 'images/Milan.jfif',
      alt: 'Миланский собор.'
  },
  {
      name: 'Верона',
      link: 'images/Verona.jfif',
      alt: 'Вид на Верону.'
  },
  {
      name: 'Помпеи',
      link: 'images/Pompei.jfif',
      alt: 'Вид на Везувий.'
  },
  {
      name: 'Сицилия',
      link: 'images/Sicily.jfif',
      alt: 'Вид с горы на побережье Сицилии.'
  },
  {
      name: 'Флоренция',
      link: 'images/Florence.jfif',
      alt: 'Вид с моста на Санта-Мария-дель-Фьоре.'
  },
  {
      name: 'Рим',
      link: 'images/Rome.jfif',
      alt: 'Руины древнего Рима.'
  }
];



//Функции для создания/удаления карточки и начальной инициализации из массива
function createCard(src, alt, text) {
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.elements__image').src = src;
  cardItem.querySelector('.elements__image').alt = alt;
  cardItem.querySelector('.elements__heading').textContent = text;
  return cardItem;
}

function renderCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    const cardItem = createCard(arr[i].link, arr[i].alt, arr[i].name);
    elements.append(cardItem);
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains('elements__delete-button')) {
    evt.target.closest('.elements__item').remove();
  }
}

//Для лайков
function toggleLike(evt) {
  if (evt.target.classList.contains('elements__like-button')) {
    evt.target.classList.toggle('elements__like-button_active');
  }
}

//Открытие и закрытие форм
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
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
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      togglePopup(popup);
    }
  }
}

/*Для клика по картинке
(если кликать мышкой, то evt.target - это img,
а если через TAB и пробел/Enter, то evt.target - это button,
поэтому рассматриваю оба случая*/
function openImage(evt) {
  if (evt.target.classList.contains('elements__image')) {
    togglePopup(openPhotoPopup);
    photo.src = evt.target.src;
    photo.alt = evt.target.alt;
    heading.textContent = evt.target.parentElement.nextElementSibling.textContent;
  } else if (evt.target.classList.contains('elements__image-button')) {
    togglePopup(openPhotoPopup);
    photo.src = evt.target.firstElementChild.src;
    photo.alt = evt.target.firstElementChild.alt;
    heading.textContent = evt.target.nextElementSibling.textContent;
  }
}

//Для открытия формы "Редактировать профиль" с автозаполнением имеющихся данных
function openEditInfoForm() {
  togglePopup(editInfoPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  //В файле validate.js обработчик слушает событие input, а в строчках выше значение value меняется программно (по условию из предыдущих спринтов).
  //Чтобы обработчик отрабатывал корректно, вызываю событие input вручную:
  const event = new Event('input');
  nameInput.dispatchEvent(event);
  descriptionInput.dispatchEvent(event);
}

function formIsValid(evt) {
  const submitButton = evt.target.lastElementChild.previousElementSibling;
  return !submitButton.classList.contains('popup__save-button_disabled');
}

//Для сохранения введённых в форму "Редактировать профиль" данных и обновления их на странице
function editInfoFormSubmitHandler(evt) {
  evt.preventDefault();
  //Все дальнейшие действия при клике на кнопку возможны только если она активна
  if (formIsValid(evt)) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    togglePopup(editInfoPopup);
  }
}

//Для добавления фотокарточек с помощью формы "Новое место"
function addCard(card) {
  elements.prepend(card);
  linkInput.value = '';
  placeInput.value = '';
}

function addPhotoFormSubmitHandler(evt) {
  evt.preventDefault();
  //Все дальнейшие действия при клике на кнопку возможны только если она активна
  if (formIsValid(evt)) {
    const cardItem = createCard(linkInput.value, placeInput.value, placeInput.value);
    addCard(cardItem);
    togglePopup(addPhotoPopup);
  }
}



//Слушатели событий
editButton.addEventListener('click', openEditInfoForm);
addButton.addEventListener('click', () => togglePopup(addPhotoPopup));
elements.addEventListener('click', toggleLike);
elements.addEventListener('click', deleteCard);
elements.addEventListener('click', openImage);
editInfoForm.addEventListener('submit', editInfoFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotoFormSubmitHandler);
closeButtons.forEach(button => button.addEventListener('click', closeButtonHandler));
popups.forEach(popup => popup.addEventListener('click', overlayClickHandler));
document.addEventListener('keydown', overlayEscHandler);



//Создание начальных карточек
renderCards(initialCards);
