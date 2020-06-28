import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator, handleOpen = () => {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formValidator = formValidator;
    this._handleOpen = handleOpen;
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._submitButton.textContent = 'Сохранение...';
      this._form.reset();
    });
  }

  open() {
    this._formValidator.clearErrors();
    this._handleOpen();
    this._submitButton.textContent = this._submitButtonText;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
