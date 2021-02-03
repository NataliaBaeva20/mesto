import { Popup } from '../components/Popup.js';
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(item) {
    super.open();
    popupImage.src = item.link;
    popupCaption.textContent = item.name;
    popupImage.alt = item.name;
    console.log('попап с картинкой');
  }
}
