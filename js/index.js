let contain = document.querySelector('.content');
let editButton = contain.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input-name');
let jobInput = document.querySelector('.form__input-job');



editButton.addEventListener('click', togglePopupVisibale);
popupCloseButton.addEventListener('click', togglePopupVisibale);

// при открытии формы заполнение полей значениями со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;


function togglePopupVisibale() {
  popup.classList.toggle('popup_visible');
}


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Отмена стандартной отправки формы.

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopupVisibale(); // закрытие попап, после изменения и сохранения информации
}

// Обработчик формы:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
