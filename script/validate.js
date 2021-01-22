const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_invalid',
  inputErrorClass: 'form__input_invalid'
}

class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
  }

  _showError(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settingsObject.inputErrorClass);
  }

  _hideError(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.textContent = "";
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
  }

  _chekInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _setButtonState() {
    const button = this._formElement.querySelector(this._settingsObject.submitButtonSelector);
    if (this._formElement.checkValidity()) {
      button.classList.remove(this._settingsObject.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._settingsObject.inactiveButtonClass);
      button.disabled = true;
    }
  }

  _setEventListener() {
    const inputList = this._formElement.querySelectorAll(this._settingsObject.inputSelector);

    this._setButtonState();
    inputList.forEach(inputElement => {
      this._hideError(inputElement); // удаление ошибок при открытии попапа, чтобы их не было до момента ввода данных
      inputElement.addEventListener('input', () => {
        this._chekInputValidity(inputElement);
        this._setButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault(); // Отмена стандартной отправки формы.
    });
    this._setEventListener();
  }
}
