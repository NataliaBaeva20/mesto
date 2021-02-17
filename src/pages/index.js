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
  avatarButton,
  imageAvatar,
  editPopupSelector,
  addPopupSelector,
  imagePopupSelector,
  deletePopupSelector,
  avatarPopupSelector,
  formEditElement,
  formAddElement,
  formAvararElement,
  avatarInput,
  buttonFormAdd,
  buttonFormEdit,
  buttonFormAvatar } from '../utils/constants.js';

import './index.css';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
    'Content-Type': 'application/json'
  }
});

const fullSizeImage = new PopupWithImage(imagePopupSelector);

const deletePopup = new PopupWithForm({
  popupSelector: deletePopupSelector
});

const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__subtitle'});

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
    fullSizeImage.setEventListeners();
    },
    handleTrashButtonClick: () => {
      deleteCardOnClick(card, item._id);
    }
  }, '.card-template', api); //создаем экземпляр карточки
  return card.generateCard();
}

function createCardSection (item) {
  const cardList = new Section ({
          data: item,
          renderer: (item) => {
            cardList.setItem(createCard(item));
          }
        },
        cardsContainer
        );
        return cardList;
}

api.getInitialCards()
  .then((cards) => {
    const arr = createCardSection(cards);
    arr.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({nameProfile: data.name, job: data.about});
    imageAvatar.src = data.avatar;
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
        const arr = createCardSection(data);
        arr.setItem(createCard(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonFormAdd, 'Создать');
      });
  }
});

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

const avatarPopup = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  handleFormSubmit: (data) => {
    renderLoading(true, buttonFormAvatar, '...');
    // отправка на сервер запроса на изменение аватара
    api.editAvatarUser(data)
      .then((data) => {
        //если ответ успешный меняем ссылку аватара в профиле
        imageAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonFormAvatar, 'Сохранить');
      });
  }
});

addButton.addEventListener('click', function () {
  addPopup.open();
  addPopup.setEventListeners();
  validFormAdd.resetValidate(); // удаление ошибок при открытии попапа
});

editButton.addEventListener('click', function () {
  editPopup.open();
  editPopup.setEventListeners();

  const infoProfile = userInfo.getUserInfo();
  userInfo.openUseInfo(infoProfile);

  validFormEdit.resetValidate();
});

avatarButton.addEventListener('click', function () {
  avatarPopup.open();
  avatarPopup.setEventListeners();
  avatarInput.value = imageAvatar.src;
  validFormAvatar.resetValidate();
});
