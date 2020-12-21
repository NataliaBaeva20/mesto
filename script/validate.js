const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_invalid',
  inputErrorClass: 'form__input_invalid'
}

function showError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputErrorClass);
}

function chekInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config);
  } else {
    showError(form, input, config);
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

function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  setButtonState(submitButton, form.checkValidity(), config); // блокировка кнопки до начала ввода данных в поля
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      chekInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Отмена стандартной отправки формы.
    });
    setEventListener(form, config);
  });
}

enableValidation(validationConfig); // получает объект настроек с нужными классами и селекторами


