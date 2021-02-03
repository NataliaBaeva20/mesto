export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    this._closeClickOverlayBind = this._closeClickOverlay.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeClickOverlay(evt) {
    if (!(evt.target.closest('.popup__container') || evt.target.closest('.popup__figure'))) {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscCloseBind);
    this._popupSelector.addEventListener('mousedown', this._closeClickOverlayBind);
  }

  close() {
    this._popupSelector.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscCloseBind);
    this._popupSelector.removeEventListener('mousedown', this._closeClickOverlayBind);
  }

  setEventListeners() {
    this._buttonClose = this._popupSelector.querySelector('.popup__close-btn');
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
  }
}
