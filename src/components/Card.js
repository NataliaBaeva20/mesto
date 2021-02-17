export class Card {
  constructor({data, handleCardClick, handleTrashButtonClick, handleLikeButton}, cardSelector, userId) {
    this._link = data.link;
    this._title = data.name;
    this._idCard = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._openPopupImage = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeButton = handleLikeButton;
    this._userId = userId;
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.card__like');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._buttonTrash = this._element.querySelector('.card__trash-btn');
  }

  visibleLike(data) {
    this._like.classList.add('card__like_active');
    this._likeCount.textContent = data.likes.length;
  }

  hiddenLike(data) {
    this._like.classList.remove('card__like_active');
    this._likeCount.textContent = data.likes.length;
  }

  _showLike() {
    this._likes.forEach(like => {
      if(like._id == this._userId) {
        this._like.classList.add('card__like_active');
      }
    });
  }

  removeToItem() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._buttonTrash.addEventListener('click', () => {
      this._handleTrashButtonClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openPopupImage();
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
    this._setEventListeners();
    this._showLike();

    //добавление данных
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeCount.textContent = this._likes.length;
    if (this._ownerId == this._userId) {
      this._buttonTrash.style.display = 'block';
      }

    return this._element; // вернем элемент наружу
  }
}
