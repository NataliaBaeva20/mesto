import { Popup } from './Popup.js';

export class PopupDelete extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._form = document.querySelector(popupSelector).querySelector('.form');
    this._submitFormDeleteBind = this._submitFormDelete.bind(this);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitFormDeleteBind);
  }

  _submitFormDelete(evt) {
    evt.preventDefault();
    this._deleteCard();
    this.close();
  }

  setSubmitHandler(deleteCard) {
    this._deleteCard = deleteCard;
    this._form.addEventListener('submit', this._submitFormDeleteBind);
  }
}
