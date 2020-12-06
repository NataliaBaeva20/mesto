let contain = document.querySelector('.content');
let editButton = contain.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_value_name');
let jobInput = document.querySelector('.form__input_value_job');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const addButton = document.querySelector('.profile__add-btn');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function togglePopupVisibale() {
  popup.classList.toggle('popup_visible');
  if (popup.classList.contains('popup_visible')) {
    // при открытии формы заполнение полей значениями со страницы
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Отмена стандартной отправки формы.

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopupVisibale(); // закрытие попап, после изменения и сохранения информации
}

function renderInitialCards() {
  const cardItems = initialCards.map(composeItem);
  cardsContainer.append(...cardItems);
}

function composeItem (item) {
  const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like').addEventListener('click', function (event) {
      event.target.classList.toggle('card__like_active');
    });
    removeToItem(cardElement);
    return cardElement;
}

function removeToItem(item) {
  const removeButton = item.querySelector('.card__trash-btn');
  removeButton.addEventListener('click', removeCard);
}

function removeCard (event) {
  const targetItem = event.target.closest('.card');
  targetItem.remove();
}





renderInitialCards();
editButton.addEventListener('click', togglePopupVisibale); // открытие попапа
popupCloseButton.addEventListener('click', togglePopupVisibale); // закрытие попапа
formElement.addEventListener('submit', handleFormSubmit); // Обработчик формы: он будет следить за событием “submit” - «отправка»
