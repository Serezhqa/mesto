function showInputError(form, input, errorMessage, inputErrorClass, textErrorClass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(textErrorClass);
}

function hideInputError(form, input, inputErrorClass, textErrorClass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(textErrorClass);
}

function checkInputValidity(form, input, properties) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, properties.inputErrorClass, properties.textErrorClass);
  } else {
    hideInputError(form, input, properties.inputErrorClass, properties.textErrorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(form, properties) {
  const inputList = Array.from(form.querySelectorAll(properties.inputSelector));
  const button = form.querySelector(properties.buttonSelector);
  toggleButtonState(inputList, button, properties.inactiveButtonClass);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, properties);
      toggleButtonState(inputList, button, properties.inactiveButtonClass);
    });
  });
}

function enableValidation(properties) {
  const formList = Array.from(document.querySelectorAll(properties.formSelector));
  formList.forEach(form => setEventListeners(form, properties));
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  textErrorClass: 'popup__input-error_visible'
})
