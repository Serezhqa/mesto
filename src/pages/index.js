import './index.css';
import {validationProperties, baseURL, token} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup';
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
  (id, evt) => confirmDeletePopup.open(id, evt),
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
      .then(result => userInfo.setUserInfo(result.name, result.about))
      .catch(err => console.log(err));
  },
  true,
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
      .then(result => cardList.addItem(createCard(result), true))
      .catch(err => console.log(err));
  },
  true,
  addPhotoFormValidator
);

const imagePopup = new PopupWithImage('.popup_type_open-photo');

const confirmDeletePopup = new PopupWithForm(
  '.popup_type_delete-photo',
  (id, evt) => {
    api.deleteCard(id)
      .then(result => evt.target.closest('.elements__item').remove())
      .catch(err => console.log(err));
  },
  false
);

const changeAvatarPopup = new PopupWithForm(
  '.popup_type_change-avatar',
  ({link}) => {
    api.changeAvatar(link)
      .then(result => userInfo.setUserAvatar(result.avatar))
      .catch(err => console.log(err));
  },
  true,
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
api.getUserInfo()
  .then(({name, about, avatar, _id}) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
    userInfo.setUserId(_id);
    /*Отрисовка начальных карточек
      (только после получения id пользователя,
       ведь в классе Card используется проверка)*/
    api.getInitialCards()
      .then(result => {
        cardList = new Section({
          items: result,
          renderer: item => cardList.addItem(createCard(item, false))
        }, '.elements');
        cardList.renderItems();
      })
      .catch(err => console.log(err));
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
