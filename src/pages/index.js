import './index.css';
import {
  validationProperties,
  initialCards,
  cardListSelector,
  editInfoForm,
  addPhotoForm,
  editButton,
  addButton
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// Создание валидаторов форм
const editInfoFormValidator = new FormValidator(validationProperties, editInfoForm);
const addPhotoFormValidator = new FormValidator(validationProperties, addPhotoForm);

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// Создание попапов
const editInfoPopup = new PopupWithForm(
  '.popup_type_edit-info',
  formData => {
    userInfo.setUserInfo(formData);
  },
  () => {
    const {username, description} = userInfo.getUserInfo();
    document.querySelector('.popup__input_type_username').value = username;
    document.querySelector('.popup__input_type_description').value = description;
  }
);
const addPhotoPopup = new PopupWithForm(
  '.popup_type_add-photo',
  formData => {
    const card = new Card(formData, '#card-template', (evt) => imagePopup.open(evt)).createCard();
    cardList.addItem(card);
  }
);
const imagePopup = new PopupWithImage('.popup_type_open-photo');

//Отрисовка начальных карточек
const cardList = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card(item, '#card-template', (evt) => imagePopup.open(evt)).createCard();
    cardList.addItem(card);
  }
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
