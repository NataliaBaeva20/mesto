const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_invalid',
  inputErrorClass: 'form__input_invalid'
}

function showError(formElement, inputElement, config) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideError(formElement, inputElement, config) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

function chekInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, config);
  } else {
    showError(formElement, inputElement, config);
  }
}

//функция блокировки кнопки, если форма не валидна
function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  setButtonState(submitButton, formElement.checkValidity(), config); // блокировка кнопки до начала ввода данных в поля
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      chekInputValidity(formElement, inputElement, config);
      setButtonState(submitButton, formElement.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(formElement => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault(); // Отмена стандартной отправки формы.
    });
    setEventListener(formElement, config);
  });
}

enableValidation(validationConfig); // получает объект настроек с нужными классами и селекторами


