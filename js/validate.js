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

function checkInputValidity(form, input, {inputErrorClass, textErrorClass}) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, textErrorClass);
  } else {
    hideInputError(form, input, inputErrorClass, textErrorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleInactiveButtonClass(button, formInvalid, inactiveButtonClass) {
  if (formInvalid) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    toggleInactiveButtonClass(button, true, inactiveButtonClass);
  } else {
    toggleInactiveButtonClass(button, false, inactiveButtonClass);
  }
}

function setEventListeners(form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...restProperties}) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, button, inactiveButtonClass);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, restProperties);
      toggleButtonState(inputList, button, inactiveButtonClass);
    });
  });
}

function enableValidation({formSelector, ...restProperties}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => setEventListeners(form, restProperties));
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  textErrorClass: 'popup__input-error_visible'
})
