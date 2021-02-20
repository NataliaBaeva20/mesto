export class Card {
  constructor({data, handleCardClick, handleTrashButtonClick, addLike, removeLike}, cardSelector, userId) {
    this._link = data.link;
    this._title = data.name;
    this._idCard = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._openPopupImage = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._userId = userId;
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.card__like');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._buttonTrash = this._element.querySelector('.card__trash-btn');
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButtonBind = this._likeButton.bind(this);
  }

  _showLike() {
    this._likes.forEach(like => {
      if(like._id == this._userId) {
        this._like.classList.add('card__like_active');
      }
    });
  }

  _showButtonTrash() {
    if (this._ownerId == this._userId) {
      this._buttonTrash.style.display = 'block';
      }
  }

  removeToItem() {
    this._element.remove();
    this._element = null;
  }

  changeCountLike(count) {
    this._likeCount.textContent = count;
  }

  _likeButton(evt) {
    if(!evt.target.classList.contains('card__like_active')) {
      this._addLike();
      this._like.classList.add('card__like_active');
    } else {
      this._removeLike();
      this._like.classList.remove('card__like_active');
    }
  }

  _setEventListeners() {
    this._like.addEventListener('click', this._likeButtonBind);

    this._buttonTrash.addEventListener('click', () => {
      this._handleTrashButtonClick();
    });

    this._cardImage.addEventListener('click', () => {
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
    this._showButtonTrash();

    //добавление данных
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeCount.textContent = this._likes.length;

    return this._element; // вернем элемент наружу
  }
}
