import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PicturePopup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDelete } from '../components/PopupDelete.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { validationConfig,
  cardsContainer,
  editButton,
  addButton,
  avatarButton,
  editPopupSelector,
  addPopupSelector,
  imagePopupSelector,
  deletePopupSelector,
  avatarPopupSelector,
  formEditElement,
  formAddElement,
  formAvararElement,
  buttonFormAdd,
  buttonFormEdit,
  buttonFormAvatar } from '../utils/constants.js';

import './index.css';
let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
    'Content-Type': 'application/json'
  }
});

const fullSizeImage = new PopupWithImage(imagePopupSelector);
fullSizeImage.setEventListeners();

const deletePopup = new PopupDelete({
  popupSelector: deletePopupSelector
});
deletePopup.setEventListeners();

const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__subtitle', avatarSelector: '.profile__image'});

const cardList = new Section({ renderer: (item) => {
  cardList.setItem(createCard(item));
}},
cardsContainer);

function renderLoading(isLoading, buttonElement, text) {
  if (isLoading) {
    buttonElement.textContent += text;
  } else {
    buttonElement.textContent = text;
  }
}

function deleteCardOnClick(card, cardId) {
  deletePopup.open();
  deletePopup.setSubmitHandler(() => {
    api.deleteCard(cardId).then((data) => {
      console.log(data);
      card.removeToItem();
    })
    .catch((err) => {
      console.log(err);
    });
  });
}

function createCard(item) {
  const card = new Card({data: item, handleCardClick: () => {
    fullSizeImage.open(item);
    },
    handleTrashButtonClick: () => {
      deleteCardOnClick(card, item._id);
    },
    addLike: () => {
      api.addLike(item._id)
        .then((res) => {
          card.changeCountLike(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeLike: () => {
      api.removeLike(item._id)
        .then((res) => {
          card.changeCountLike(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, '.card-template', userId); //создаем экземпляр карточки
  return card.generateCard();
}

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({nameProfile: data.name, job: data.about});
    userInfo.setAvatarUser({avatar: data.avatar});
    userId = data._id
  });

api.getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//создание экземпляров с валидацией для каждой формы
const validFormAdd = new FormValidator(validationConfig, formAddElement);
validFormAdd.enableValidation();

const validFormEdit = new FormValidator(validationConfig, formEditElement);
validFormEdit.enableValidation();

const validFormAvatar = new FormValidator(validationConfig, formAvararElement);
validFormAvatar.enableValidation();


// создание экземпляра для каждого попапа с формой
const addPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  // объект, который мы передадим при вызове handleFormSubmit окажется на месте параметра formData
  handleFormSubmit: (formData) => {
    renderLoading(true, buttonFormAdd, '...');
    api.postCard(formData)
      .then((data) => {
        cardList.setItem(createCard(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonFormAdd, 'Создать');
      });
  }
});
addPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (data) => {
    renderLoading(true, buttonFormEdit, '...');
    userInfo.setUserInfo(data);
    api.editUserInfo(data)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonFormEdit, 'Сохранить');
      });
  }
});
editPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  handleFormSubmit: (data) => {
    renderLoading(true, buttonFormAvatar, '...');
    // отправка на сервер запроса на изменение аватара
    api.editAvatarUser(data)
      .then((data) => {
        //если ответ успешный меняем ссылку аватара в профиле
        userInfo.setAvatarUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonFormAvatar, 'Сохранить');
      });
  }
});
avatarPopup.setEventListeners();

addButton.addEventListener('click', function () {
  addPopup.open();
  validFormAdd.resetValidate(); // удаление ошибок при открытии попапа
});

editButton.addEventListener('click', function () {
  editPopup.open();
  const infoProfile = userInfo.getUserInfo();
  userInfo.openUseInfo(infoProfile);
  validFormEdit.resetValidate();
});

avatarButton.addEventListener('click', function () {
  avatarPopup.open();
  validFormAvatar.resetValidate();
});
