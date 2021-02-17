import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = document.querySelector(popupSelector).querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._submitFormBind = this._submitForm.bind(this);
    this._submitFormDeleteBind = this._submitFormDelete.bind(this);
  }

  _getInputValues() {
    // достаем все элементы полей
    this._inputList = this._form.querySelectorAll('.form__input');

    // создаем пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _submitForm(evt) {
    evt.preventDefault();
    // добавим вызов функции _handleFormSubmit и передадим ей объект — результат работы _getInputValues
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  close() {
    super.close();
    this._form.reset(); // несохраненные данные при повторном открытии popup удаляются
    this._form.removeEventListener('submit', this._submitFormBind);
    this._form.removeEventListener('submit', this._submitFormDeleteBind);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFormBind);
  }

  _submitFormDelete(evt) {
    evt.preventDefault();
    this._deleteCard();
    this.close();
  }

  _setEventListenerButtonDelete() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFormDeleteBind);
  }

  setSubmitHandler(deleteCard) {
    this._setEventListenerButtonDelete();
    this._deleteCard = deleteCard;
  }
}
