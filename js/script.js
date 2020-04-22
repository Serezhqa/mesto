//Для попапа "Редактировать профиль"
const editInfoPopup = document.querySelector('.popup_type_edit-info');
const editInfoForm = editInfoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editInfoPopup.querySelector('.popup__input-item_type_username');
const descriptionInput = editInfoPopup.querySelector('.popup__input-item_type_description');

//Для попапа "Новое место"
const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPhotoPopup.querySelector('.popup__form');
const placeInput = addPhotoPopup.querySelector('.popup__input-item_type_place');
const linkInput = addPhotoPopup.querySelector('.popup__input-item_type_link');

//Для попапа с увеличенным фото
const openPhotoPopup = document.querySelector('.popup_type_open-photo');
const photo = openPhotoPopup.querySelector('.popup__image');
const heading = openPhotoPopup.querySelector('.popup__heading');

//Все кнопки открытия форм
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Все кнопки закрытия форм
const closeButtons = document.querySelectorAll('.popup__close-button');

//Для начальной загрузки фотографий
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
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;



//Добавление начальных фотокарточек при загрузке страницы
for (let i = 0; i < initialCards.length; i++) {
  let cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.elements__image').src = initialCards[i].link;
  cardItem.querySelector('.elements__image').alt = initialCards[i].alt;
  cardItem.querySelector('.elements__heading').textContent = initialCards[i].name;
  elements.append(cardItem);
}
//Появились кнопки удаления, лайка и кнопка для раскрытия картинки - добавляем для них функции
const likeButtons = document.querySelectorAll('.elements__like-button');
const deleteButtons = document.querySelectorAll('.elements__delete-button');
const imageButtons = document.querySelectorAll('.elements__image-button');
function toggleLike(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}
function deleteCard(evt) {
  evt.target.closest('.elements__item').remove();
}
function openImage(evt) {
  togglePopup(openPhotoPopup);
  photo.src = evt.target.src;
  heading.textContent = evt.target.parentElement.nextElementSibling.textContent;
}

//Открытие и закрытие форм
function togglePopup(popup) {
  popup.classList.toggle('popup_hidden');
  popup.classList.toggle('popup_opened');
}
function closeButtonHandler(evt) {
  togglePopup(evt.target.closest('.popup'));
}

//Открытие формы "Редактировать профиль" с автозаполнением имеющихся данных
function openEditInfoForm() {
  togglePopup(editInfoPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

//Сохранение введённых в форму "Редактировать профиль" данных и обновление их на странице
function editInfoFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  togglePopup(editInfoPopup);
}

//Добавление фотокарточек с помощью формы "Новое место"
function addPhotoFormSubmitHandler(evt) {
  evt.preventDefault();
  let cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.elements__image').src = linkInput.value;
  cardItem.querySelector('.elements__image').alt = placeInput.value;
  cardItem.querySelector('.elements__heading').textContent = placeInput.value;
  cardItem.querySelector('.elements__like-button').addEventListener('click', toggleLike);
  cardItem.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  cardItem.querySelector('.elements__image-button').addEventListener('click', openImage);
  elements.prepend(cardItem);
  linkInput.value = '';
  placeInput.value = '';
  togglePopup(addPhotoPopup);
}

//Слушатели событий
editButton.addEventListener('click', openEditInfoForm);
addButton.addEventListener('click', () => togglePopup(addPhotoPopup));
editInfoForm.addEventListener('submit', editInfoFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotoFormSubmitHandler);
closeButtons.forEach(function(button) {
  button.addEventListener('click', closeButtonHandler);
});
likeButtons.forEach(function(button) {
  button.addEventListener('click', toggleLike);
})
deleteButtons.forEach(function(button) {
  button.addEventListener('click', deleteCard);
})
imageButtons.forEach(function(button) {
  button.addEventListener('click', openImage);
})
