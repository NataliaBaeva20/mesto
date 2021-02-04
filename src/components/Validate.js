export class FormValidator {
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
    this._button = this._formElement.querySelector(this._settingsObject.submitButtonSelector);
    if (this._formElement.checkValidity()) {
      this._button.classList.remove(this._settingsObject.inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._settingsObject.inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  _setEventListener() {
    this._inputList = this._formElement.querySelectorAll(this._settingsObject.inputSelector);

    this._setButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._chekInputValidity(inputElement);
        this._setButtonState();
      });
    });
  }

  resetValidate() {
    this._inputList.forEach(inputElement => {
      this._hideError(inputElement);
    });
    this._setButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault(); // Отмена стандартной отправки формы.
    });
    this._setEventListener();
  }
}
