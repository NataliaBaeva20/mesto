import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Validate.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards,
  validationConfig,
  cardsContainer,
  editButton,
  addButton,
  editPopupSelector,
  addPopupSelector,
  imagePopupSelector,
  formEditElement,
  formAddElement } from '../utils/constants.js';


const fullSizeImage = new PopupWithImage(imagePopupSelector);

// функция создания карточки
function createCard(item) {
  const card = new Card({data: item, handleCardClick: () => {
    fullSizeImage.open(item);
  }}, '.card-template'); //создаем экземпляр карточки

  const cardElement = card.generateCard(); //создаем карточку и возвращаем наружу

  cardList.setItem(cardElement); //добавляем в DOM
}

const cardList = new Section ({
    data: initialCards,
    renderer: (item) => {
      createCard(item);
    }
  },
  cardsContainer
);

cardList.renderItems();

//создание экземпляров с валидацией для каждой формы
const validFormAdd = new FormValidator(validationConfig, formAddElement);
validFormAdd.enableValidation();

const validFormEdit = new FormValidator(validationConfig, formEditElement);
validFormEdit.enableValidation();



// создание экземпляра для popup add

const addPopup = new PopupWithForm({
  popupSelector: addPopupSelector,

  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра formData
  handleFormSubmit: (formData) => {
    createCard(formData);
  }
});

addButton.addEventListener('click', function () {
  addPopup.open();
  addPopup.setEventListeners();
  validFormAdd.resetValidate(); // удаление ошибок при открытии попапа
});


const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__subtitle'});

// создание экземпляра для popup edit
const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

editButton.addEventListener('click', function () {
  editPopup.open();
  editPopup.setEventListeners();

  const infoProfile = userInfo.getUserInfo();
  userInfo.openUseInfo(infoProfile);

  validFormEdit.resetValidate();
});
