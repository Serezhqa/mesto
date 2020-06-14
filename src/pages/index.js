import './index.css';
import {
  validationProperties,
  initialCards,
  cardListSelector
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//Для попапа "Редактировать профиль"
const editInfoPopupElement = document.querySelector('.popup_type_edit-info');
const editInfoForm = editInfoPopupElement.querySelector('.popup__form');

//Для попапа "Новое место"
const addPhotoPopupElement = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPhotoPopupElement.querySelector('.popup__form');

//Все кнопки открытия форм
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Создание валидаторов форм
const editInfoFormValidator = new FormValidator(validationProperties, editInfoForm);
const addPhotoFormValidator = new FormValidator(validationProperties, addPhotoForm);

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const createCard = data => new Card(data, '#card-template', ({name, link}) => imagePopup.open(name, link)).createCard();

// Создание попапов
const editInfoPopup = new PopupWithForm(
  '.popup_type_edit-info',
  formData => {
    userInfo.setUserInfo(formData);
  },
  editInfoFormValidator,
  () => {
    const {username, description} = userInfo.getUserInfo();
    document.querySelector('.popup__input_type_username').value = username;
    document.querySelector('.popup__input_type_description').value = description;
  }
);

const addPhotoPopup = new PopupWithForm(
  '.popup_type_add-photo',
  formData => cardList.addItem(createCard(formData)),
  addPhotoFormValidator
);

const imagePopup = new PopupWithImage('.popup_type_open-photo');

//Отрисовка начальных карточек
const cardList = new Section({
  items: initialCards,
  renderer: item => cardList.addItem(createCard(item))
}, cardListSelector);
cardList.renderItems();



//Слушатели событий
editButton.addEventListener('click', () => {
  // userInfo.getUserInfo();
  editInfoPopup.open();
});
addButton.addEventListener('click', () => addPhotoPopup.open());



//Запуск валидации форм
editInfoFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();
