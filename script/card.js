import { openPopup } from './index.js';

//для попапа предосмотра картинки
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
  }

  _likeToItem() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _removeToItem() {
    this._element.remove();
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._title;
    popupCaption.textContent = this._title;
    openPopup(imagePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeToItem();
    });

    this._element.querySelector('.card__trash-btn').addEventListener('click', () => {
      this._removeToItem();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  _getTemplate() {
    //забираем разметку из html и клонируем элемент
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    // возвращаем dom-елемент карточки
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate(); //запись разментки в приватное поле _element
    this._setEventListeners();

    //добавление данных
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element; // вернем элемент наружу
  }
}
