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
  arr.forEach(({link, alt, name}) => elements.append(createCard(link, alt, name)));
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
    heading.textContent = evt.target.parentElement.nextElementSibling.textContent;
    togglePopup(openPhotoPopup);
  } else if (evt.target.classList.contains('elements__image-button')) {
    photo.src = evt.target.firstElementChild.src;
    photo.alt = evt.target.firstElementChild.alt;
    heading.textContent = evt.target.nextElementSibling.textContent;
    togglePopup(openPhotoPopup);
  }
}

//Для открытия формы "Редактировать профиль" с автозаполнением имеющихся данных
function openEditInfoForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  //Возможна ситуация, что пользователь ввёл невалидные значения и закрыл окно. Тогда при следующем открытии формы
  //подтянутся валидные значения (две строчки выше), но текст ошибки останется. Исправим это:
  if (nameInput.classList.contains('popup__input_type_error')) {
    hideInputError(editInfoForm, nameInput, 'popup__input_type_error', 'popup__input-error_visible');
  }
  if (descriptionInput.classList.contains('popup__input_type_error')) {
    hideInputError(editInfoForm, descriptionInput, 'popup__input_type_error', 'popup__input-error_visible');
  }
  togglePopup(editInfoPopup);
}

//Для сохранения введённых в форму "Редактировать профиль" данных и обновления их на странице
function editInfoFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  togglePopup(editInfoPopup);
}

//Для добавления фотокарточек с помощью формы "Новое место"
function addCard(card) {
  elements.prepend(card);
  linkInput.value = '';
  placeInput.value = '';
}

function addPhotoFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardItem = createCard(linkInput.value, placeInput.value, placeInput.value);
  addCard(cardItem);
  togglePopup(addPhotoPopup);
}



//Слушатели событий
editButton.addEventListener('click', openEditInfoForm);
addButton.addEventListener('click', () => togglePopup(addPhotoPopup));
elements.addEventListener('click', toggleLike);
elements.addEventListener('click', deleteCard);
elements.addEventListener('click', openImage);
editInfoForm.addEventListener('submit', editInfoFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotoFormSubmitHandler);



//Создание начальных карточек
renderCards(initialCards);
