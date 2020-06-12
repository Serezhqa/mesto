import romeImage from '../images/Rome.jfif';
import florenceImage from '../images/Florence.jfif';
import sicilyImage from '../images/Sicily.jfif';
import pompeiImage from '../images/Pompei.jfif';
import veronaImage from '../images/Verona.jfif';
import milanImage from '../images/Milan.jfif';

//Для попапа "Редактировать профиль"
const editInfoPopup = document.querySelector('.popup_type_edit-info');
export const editInfoForm = editInfoPopup.querySelector('.popup__form');

//Для попапа "Новое место"
const addPhotoPopup = document.querySelector('.popup_type_add-photo');
export const addPhotoForm = addPhotoPopup.querySelector('.popup__form');

//Все кнопки открытия форм
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

//Для валидации форм
export const validationProperties = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  textErrorClass: 'popup__input-error_visible'
};

//Для начальной загрузки фотографий
export const cardListSelector = ('.elements');
export const initialCards = [
  {
    name: 'Рим',
    link: romeImage
  },
  {
    name: 'Флоренция',
    link: florenceImage
  },
  {
    name: 'Сицилия',
    link: sicilyImage
  },
  {
    name: 'Помпеи',
    link: pompeiImage
  },
  {
    name: 'Верона',
    link: veronaImage
  },
  {
    name: 'Милан',
    link: milanImage
  }
];
