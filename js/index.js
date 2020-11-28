let contain = document.querySelector('.content');
let editButton = contain.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_value_name');
let jobInput = document.querySelector('.form__input_value_job');


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

editButton.addEventListener('click', togglePopupVisibale);
popupCloseButton.addEventListener('click', togglePopupVisibale);
formElement.addEventListener('submit', handleFormSubmit); // Обработчик формы: он будет следить за событием “submit” - «отправка»
