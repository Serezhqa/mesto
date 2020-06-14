import romeImage from '../images/Rome.jfif';
import florenceImage from '../images/Florence.jfif';
import sicilyImage from '../images/Sicily.jfif';
import pompeiImage from '../images/Pompei.jfif';
import veronaImage from '../images/Verona.jfif';
import milanImage from '../images/Milan.jfif';

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
