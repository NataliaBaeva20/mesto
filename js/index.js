const contain = document.querySelector('.content');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

const editButton = contain.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup  = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

const formEditElement = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.form__input_value_name');
const jobInput = document.querySelector('.form__input_value_job');

const formAddElement = document.querySelector('.form_type_add');
const inputCardNameElement = document.querySelector('.form__input_value_card-name');
const inputCardLinkElement = document.querySelector('.form__input_value_card-link');

const initialCards = [
  {
      name: 'Каппадокия',
      link: 'https://images.unsplash.com/photo-1607261890461-84fd1bfc2504?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Республика Карелия',
    link: 'https://images.unsplash.com/photo-1590079019458-0eb5b40a3371?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Зеленоградск',
      link: 'https://images.unsplash.com/photo-1576509994154-82431e076467?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
      name: 'Форт Красная Горка, Ленинградская область',
      link: 'https://images.unsplash.com/photo-1590079019111-ad01176f94d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
  }
];


function renderInitialCards() {
  const cardItems = initialCards.map(composeCard);
  cardsContainer.append(...cardItems);
}

function composeCard (item) {
  const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like').addEventListener('click', function (event) {
      event.target.classList.toggle('card__like_active');
    });
    removeToItem(cardElement);
    cardElement.querySelector('.card__image').addEventListener('click', function(event) {
      const imageTarget = event.target;
      openImagePopup(imageTarget, item);
    });

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

function openImagePopup (imageTarget, item) {
  togglePopupVisibale(imagePopup);
  document.querySelector('.popup__image').src = imageTarget.src;
  document.querySelector('.popup__caption').textContent = item.name;
}

function togglePopupVisibale (popup) {
  popup.classList.toggle('popup_visible');
  if (popup.classList.contains('popup_visible')) {
    // при открытии формы заполнение полей значениями со страницы
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

[...popupCloseButtons].forEach(function (button) {
  button.addEventListener('click', function(event) {
    togglePopupVisibale(event.target.closest('.popup'));
  });
});

function handleEditFormSubmit (event) {
  event.preventDefault(); // Отмена стандартной отправки формы.

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopupVisibale(event.target.closest('.popup')); // закрытие попап, после изменения и сохранения информации
}

function addCard(event) {
  event.preventDefault();
  const nameCardInput = inputCardNameElement.value;
  const linkCardInput = inputCardLinkElement.value;
  const newItem = composeCard({ name:nameCardInput, link:linkCardInput });
  cardsContainer.prepend(newItem);

  inputCardNameElement.value = '';
  inputCardLinkElement.value = '';
  togglePopupVisibale(event.target.closest('.popup'));
}

editButton.addEventListener('click', function () {
  togglePopupVisibale(editPopup);
});

addButton.addEventListener('click', function () {
  togglePopupVisibale(addPopup);
});

formAddElement.addEventListener('submit', addCard);
formEditElement.addEventListener('submit', handleEditFormSubmit); // Обработчик формы: он будет следить за событием “submit” - «отправка»
renderInitialCards();
