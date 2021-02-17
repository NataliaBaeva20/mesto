import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image');
    this._popupCaption = document.querySelector('.popup__caption');
  }

  open(item) {
    super.open();
    this._popupImage.src = item.link;
    this._popupCaption.textContent = item.name;
    this._popupImage.alt = item.name;
  }
}
