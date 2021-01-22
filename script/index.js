import { Card } from './card.js';
import { FormValidator } from './validate.js';
import { initialCards, validationConfig } from './constants.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.cards');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup  = document.querySelector('.popup_type_add');
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

export function openPopup(popup) {
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

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template'); //создаем экземпляр карточки

  const cardElement = card.generateCard(); //создаем карточку и возвращаем наружу

  cardsContainer.append(cardElement); //добавляем в DOM
});

formAddElement.addEventListener('submit', addCard); // Обработчик формы: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', handleEditFormSubmit);
