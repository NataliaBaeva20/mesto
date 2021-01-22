const contain = document.querySelector('.content');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.cards');
// const cardTemplate = document.querySelector('.card-template').content;

const editButton = contain.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup  = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

const formEditElement = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__input_value_name');
const jobInput = document.querySelector('.form__input_value_job');

const formAddElement = document.querySelector('.form_type_add');
const inputCardNameElement = document.querySelector('.form__input_value_card-name');
const inputCardLinkElement = document.querySelector('.form__input_value_card-link');

const popupList = document.querySelectorAll('.popup');

function passPopupList() {
  popupList.forEach(popup => {
    if (popup.classList.contains('popup_visible')) {
      closePopup(popup);
    }
  });
}

function closeClickOverlay(event) {
  if (!(event.target.closest('.popup__container') || event.target.closest('.popup__figure'))) {
    passPopupList();
  }
}

function closePressingKey (evt) {
  if (evt.key === 'Escape') {
    passPopupList();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_visible');
  popup.addEventListener('mousedown', closeClickOverlay);
  document.addEventListener('keydown', closePressingKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  popup.removeEventListener('mousedown', closeClickOverlay);
  document.removeEventListener('keydown', closePressingKey);
}



[...popupCloseButtons].forEach(function (button) {
  button.addEventListener('click', function(event) {
    closePopup(event.target.closest('.popup'));
  });
});

function handleEditFormSubmit (event) {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(event.target.closest('.popup')); // закрытие попап, после изменения и сохранения информации
}
// добавление новой карточки
function addCard(event) {
  const nameCardInput = inputCardNameElement.value;
  const linkCardInput = inputCardLinkElement.value;
  const newItem = new Card({ name:nameCardInput, link:linkCardInput }, '.card-template');
  cardsContainer.prepend(newItem.generateCard());

  formAddElement.reset(); // очистка полей формы
  closePopup(event.target.closest('.popup'));
}

editButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  const validForm = new FormValidator(validationConfig, formEditElement);
  validForm.enableValidation();
});

addButton.addEventListener('click', function () {
  formAddElement.reset(); // несохраненные данные при повторном открытии popup удаляются

  openPopup(addPopup);

  const validForm = new FormValidator(validationConfig, formAddElement);
  validForm.enableValidation();
});

formAddElement.addEventListener('submit', addCard); // Обработчик формы: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', handleEditFormSubmit);







//для попапа предосмотра картинки
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

class Card {
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
    this._element = this._getTemplate(); //запись разментки в приватное поле _element, так у других элементов появится доступ к ней.
    this._setEventListeners();

    //добавляем данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element; // вернем элемент наружу
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template'); //создаем экземпляр карточки

  const cardElement = card.generateCard(); //создаем карточку и возвращаем наружу

  document.querySelector('.cards').append(cardElement); //добавляем в DOM
});
