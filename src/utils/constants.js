export const initialCards = [
  {
    name: 'Форт Красная Горка, Ленинградская область',
    link: 'https://images.unsplash.com/photo-1590079019111-ad01176f94d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
  },
  {
    name: 'Зеленоградск',
    link: 'https://images.unsplash.com/photo-1576509994154-82431e076467?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Республика Карелия',
    link: 'https://images.unsplash.com/photo-1590079019458-0eb5b40a3371?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Каппадокия',
    link: 'https://images.unsplash.com/photo-1607261890461-84fd1bfc2504?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
  }
];

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_invalid',
  inputErrorClass: 'form__input_invalid'
}

export const cardsContainer = '.cards';

export const editButton = document.querySelector('.profile__edit-btn');
export const addButton = document.querySelector('.profile__add-btn');

export const nameInput = document.querySelector('.form__input_value_name');
export const jobInput = document.querySelector('.form__input_value_job');

export const editPopupSelector = '.popup_type_edit';
export const addPopupSelector  = '.popup_type_add';
export const imagePopupSelector = '.popup_type_image';

export const formEditElement = document.querySelector('.form_type_edit');
export const formAddElement = document.querySelector('.form_type_add');
