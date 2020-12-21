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

const formEditElement = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__input_value_name');
const jobInput = document.querySelector('.form__input_value_job');

const formAddElement = document.querySelector('.form_type_add');
const inputCardNameElement = document.querySelector('.form__input_value_card-name');
const inputCardLinkElement = document.querySelector('.form__input_value_card-link');

const popupList = document.querySelectorAll('.popup');

function renderInitialCards() {
  const cardItems = initialCards.map(composeCard);
  cardsContainer.append(...cardItems);
}

function composeCard (item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;

  likeToItem(cardElement);
  removeToItem(cardElement);
  cardImage.addEventListener('click', function(event) {
    const imageTarget = event.target;
    openImagePopup(imageTarget, item);
  });

  return cardElement;
}

function likeToItem(item) {
  const likeButton = item.querySelector('.card__like');
  likeButton.addEventListener('click', likeCard);
}

function likeCard(event) {
  event.target.classList.toggle('card__like_active');
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
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  popupImage.src = imageTarget.src;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(imagePopup);
}

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
  if (popup.classList.contains('popup_type_add')) {
    formAddElement.reset();
  }
}

[...popupCloseButtons].forEach(function (button) {
  button.addEventListener('click', function(event) {
    closePopup(event.target.closest('.popup'));
  });
});

function handleEditFormSubmit (event) {
  event.preventDefault(); // Отмена стандартной отправки формы.

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(event.target.closest('.popup')); // закрытие попап, после изменения и сохранения информации
}

function addCard(event) {
  event.preventDefault();
  const nameCardInput = inputCardNameElement.value;
  const linkCardInput = inputCardLinkElement.value;
  const newItem = composeCard({ name:nameCardInput, link:linkCardInput });
  cardsContainer.prepend(newItem);

  formAddElement.reset(); // очистка полей формы
  closePopup(event.target.closest('.popup'));
}

editButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  enableValidation(validationConfig);
});

addButton.addEventListener('click', function () {
  openPopup(addPopup);
  enableValidation(validationConfig);
});

formAddElement.addEventListener('submit', addCard); // Обработчик формы: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', handleEditFormSubmit);
renderInitialCards();
