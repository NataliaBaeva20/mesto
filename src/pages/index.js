import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Validate.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { validationConfig,
  cardsContainer,
  editButton,
  addButton,
  editPopupSelector,
  addPopupSelector,
  imagePopupSelector,
  formEditElement,
  formAddElement } from '../utils/constants.js';

import './index.css'

const fullSizeImage = new PopupWithImage(imagePopupSelector);

// функция создания карточки
function createCard(item, cardList) {
  const card = new Card({data: item, handleCardClick: () => {
    fullSizeImage.open(item);
  }}, '.card-template'); //создаем экземпляр карточки

  const cardElement = card.generateCard(); //создаем карточку и возвращаем наружу
  cardList.setItem(cardElement); //добавляем в DOM
}

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


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({nameProfile: data.name, job: data.about});
    document.querySelector('.profile__image').src = data.avatar;
  });

const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__subtitle'});

// создание экземпляра для popup edit
const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    api.editUserInfo(data);
  }
});

editButton.addEventListener('click', function () {
  editPopup.open();
  editPopup.setEventListeners();

  const infoProfile = userInfo.getUserInfo();
  userInfo.openUseInfo(infoProfile);

  validFormEdit.resetValidate();
});

api.getInitialCards()
.then((data) => {
  // console.log(data);
  const cardList = new Section ({
    data: data,
    renderer: (item) => {
      createCard(item, cardList);
    }
  },
  cardsContainer
);

cardList.renderItems();
});
