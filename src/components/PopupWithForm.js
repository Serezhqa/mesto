import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, hasInputs, formValidator = null, handleOpen = () => {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._hasInputs = hasInputs;
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
      if (this._hasInputs) {
        this._handleFormSubmit(this._getInputValues());
        this._submitButton.textContent = 'Сохранение...';
      } else {
        this._handleFormSubmit(this._id, this._evt);
      }
      this.close();
      this._form.reset();
    });
  }

  open(id = null, evt = null) {
    if (this._hasInputs) {
      this._formValidator.clearErrors();
    }
    if (id) {
      this._id = id;
      this._evt = evt;
    }
    this._handleOpen();
    this._submitButton.textContent = this._submitButtonText;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
