import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Validate.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { initialCards,
  validationConfig,
  cardsContainer,
  editButton,
  addButton,
  imageAvatar,
  editPopupSelector,
  addPopupSelector,
  imagePopupSelector,
  deletePopupSelector,
  avatarPopupSelector,
  formEditElement,
  formAddElement,
  formAvararElement } from '../utils/constants.js';

import './index.css'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
    'Content-Type': 'application/json'
  }
});

const fullSizeImage = new PopupWithImage(imagePopupSelector);
const deletePopup = new PopupWithForm({
  popupSelector: deletePopupSelector,
  handleFormSubmit: () => {

  }
});

// функция создания карточки
function createCard(item) {
  const card = new Card({data: item, handleCardClick: () => {
    fullSizeImage.open(item);
    fullSizeImage.setEventListeners();
    },
    handleTrashButtonClick: () => {
      deletePopup.open();
      deletePopup.setEventListeners();
    }
}, '.card-template'); //создаем экземпляр карточки
  return card.generateCard();
  // const cardElement = card.generateCard(); //создаем карточку и возвращаем наружу
  // cardList.setItem(cardElement); //добавляем в DOM
}

api.getInitialCards()
  .then((cards) => {
    console.log(cards);
    const cardList = new Section ({
      data: cards,
      renderer: (item) => {
        cardList.setItem(createCard(item));
        // createCard(item);
        // document.querySelector('.card__like-count').textContent = item.likes.length;
        console.log(item.likes.length);
      }
    },
    cardsContainer
    );
    cardList.renderItems();
  });

//создание экземпляров с валидацией для каждой формы
const validFormAdd = new FormValidator(validationConfig, formAddElement);
validFormAdd.enableValidation();

const validFormEdit = new FormValidator(validationConfig, formEditElement);
validFormEdit.enableValidation();



// создание экземпляра для popup add

const addPopup = new PopupWithForm({
  popupSelector: addPopupSelector,

  // объект, который мы передадим при вызове handleFormSubmit окажется на месте параметра formData
  handleFormSubmit: (formData) => {
    api.postCard(formData)
      .then((data) => {
        document.querySelector('.cards').prepend(createCard(data));
      });
  }
});

addButton.addEventListener('click', function () {
  addPopup.open();
  addPopup.setEventListeners();
  validFormAdd.resetValidate(); // удаление ошибок при открытии попапа
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

// const cardList = new Section ({
//       data: initialCards,
//       renderer: (item) => {
//         createCard(item);
//       }
//     },
//     cardsContainer
//   );
// cardList.renderItems();

const validFormAvatar = new FormValidator(validationConfig, formAvararElement);
validFormAvatar.enableValidation();

const avatarPopup = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  handleFormSubmit: (data) => {
    // отправка на сервер запроса на изменение аватара
    api.editAvatarUser(data)
      .then((data) => {
        //если ответ успешный меняем ссылку аватара в профиле
        imageAvatar.src = data.avatar;
      });
  }
});

imageAvatar.addEventListener('click', function () {
  avatarPopup.open();
  avatarPopup.setEventListeners();
  validFormAvatar.resetValidate();
});
