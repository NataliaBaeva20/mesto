export class Card {
  constructor({data, handleCardClick, handleTrashButtonClick, handleLike}, cardSelector, api) {
    this._link = data.link;
    this._title = data.name;
    this._idCard = data._id;
    this._likes = data.likes;
    this._idOwner = data.owner._id;
    this._cardSelector = cardSelector;
    this._openPopupImage = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLike = handleLike;
    this._api = api;

  }

  _addLike() {
    this._api.setLike(this._idCard)
      .then((data) => {
        this._element.querySelector('.card__like').classList.add('card__like_active');
        this._element.querySelector('.card__like-count').textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _deleteLike() {
    this._api.deleteLike(this._idCard)
      .then((data) => {
        this._element.querySelector('.card__like').classList.remove('card__like_active');
        this._element.querySelector('.card__like-count').textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _likeToItem() {
    //отправляем запрос на сервес, чтобы достать массив лайков для проверки есть лайк или нет от нас
    this._api.getInitialCards()
      .then((data) => {
        data.forEach(item => {
          if (item._id == this._idCard) {
            //если массив лайков пустой, то добавляем лайк
            if(item.likes == 0) {
              this._addLike();
            }
            //иначе если массив не пустой, то проверяем, если в нем элемент с нашем id
            const proverka = item.likes.some(function(element) {
              return element._id == 'c31535636f4703fab2691925';
            });
            // вызываем функцию в зависисоти от проверти на наше id
            if (proverka) {
              this._deleteLike();
            } else {
              this._addLike();
            }
          }
        });
      });
  }

  _showLike() {
    this._likes.forEach(like => {
      if(like._id == 'c31535636f4703fab2691925') {
        this._element.querySelector('.card__like').classList.add('card__like_active');
      }
    });
  }

  _removeToItem() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeToItem();
    });

    this._element.querySelector('.card__trash-btn').addEventListener('click', () => {
      // this._removeToItem();
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
    this._element = this._getTemplate(); //запись разментки в приватное поле _element
    this._setEventListeners();
    this._showLike();

    //добавление данных
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    if (this._idOwner == 'c31535636f4703fab2691925') {
        this._element.querySelector('.card__trash-btn').style.display = 'block';
      }

    return this._element; // вернем элемент наружу
  }
}
