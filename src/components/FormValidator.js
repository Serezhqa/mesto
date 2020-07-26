export default class FormValidator {
  constructor(properties, form) {
    this._formSelector = properties.formSelector;
    this._inputSelector = properties.inputSelector;
    this._submitButtonSelector = properties.submitButtonSelector;
    this._inactiveButtonClass = properties.inactiveButtonClass;
    this._inputErrorClass = properties.inputErrorClass;
    this._textErrorClass = properties.textErrorClass;
    this._form = form;
  }

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._textErrorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._textErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  clearErrors() {
    this._inputs.forEach(input => {
      if (input.classList.contains(this._inputErrorClass)) {
        this._hideInputError(input);
      }
    });
    this._toggleButtonState(this._inputs, this._button);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
