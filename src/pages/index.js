import './index.css';
import {validationProperties, baseURL, token} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

//Для попапа "Редактировать профиль"
const editInfoPopupElement = document.querySelector('.popup_type_edit-info');
const editInfoForm = editInfoPopupElement.querySelector('.popup__form');

//Для попапа "Новое место"
const addPhotoPopupElement = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPhotoPopupElement.querySelector('.popup__form');

//Для попапа смены аватара
const changeAvatarPopupElement = document.querySelector('.popup_type_change-avatar');
const changeAvatarForm = changeAvatarPopupElement.querySelector('.popup__form');

//Все кнопки открытия форм
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

//Создание валидаторов форм
const editInfoFormValidator = new FormValidator(validationProperties, editInfoForm);
const addPhotoFormValidator = new FormValidator(validationProperties, addPhotoForm);
const changeAvatarFormValidator = new FormValidator(validationProperties, changeAvatarForm);

//Функция создания карточки
const createCard = data => new Card(
  data,
  userInfo.getUserId(),
  '#card-template',
  ({name, link}) => imagePopup.open(name, link),
  (id, func) => confirmDeletePopup.open(id, func),
  (id, liked) => api.likeCard(id, liked)
).createCard();

//Создание попапов
const editInfoPopup = new PopupWithForm(
  '.popup_type_edit-info',
  formData => {
    api.updateUserInfo({
      name: formData.username,
      about: formData.description
    })
      .then(result => {
        userInfo.setUserInfo(result.name, result.about);
        editInfoPopup.close();
      })
      .catch(err => console.log(err));
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
  formData => {
    api.uploadCard(formData)
      .then(result => {
        cardList.prependItem(createCard(result));
        addPhotoPopup.close();
      })
      .catch(err => console.log(err));
  },
  addPhotoFormValidator
);

const imagePopup = new PopupWithImage('.popup_type_open-photo');

const confirmDeletePopup = new PopupWithConfirm(
  '.popup_type_delete-photo',
  (id, func) => {
    api.deleteCard(id)
      .then(result => {
        func();
        confirmDeletePopup.close();
      })
      .catch(err => console.log(err));
  }
);

const changeAvatarPopup = new PopupWithForm(
  '.popup_type_change-avatar',
  ({link}) => {
    api.changeAvatar(link)
      .then(result => {
        userInfo.setUserAvatar(result.avatar);
        changeAvatarPopup.close();
      })
      .catch(err => console.log(err));
  },
  changeAvatarFormValidator
);

//Для взаимодействия с информацией о пользователе
const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

//Для взаимодействия с сервером
const api = new Api(baseURL, token);

//Секция для карточек
let cardList;



//Получаем данные пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{name, about, avatar, _id}, initialCards]) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
    userInfo.setUserId(_id);
    cardList = new Section({
      items: initialCards,
      renderer: item => cardList.appendItem(createCard(item))
    }, '.elements');
    cardList.renderItems();
  })
  .catch(err => console.log(err));



//Запуск валидации форм
editInfoFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();



//Слушатели событий
editButton.addEventListener('click', () => editInfoPopup.open());
addButton.addEventListener('click', () => addPhotoPopup.open());
avatarButton.addEventListener('click', () => changeAvatarPopup.open());
