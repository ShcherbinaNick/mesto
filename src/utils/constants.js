export const profileSelector = '.popup_type_profile-edit';
export const cardEditSelector = '.popup_type_new-card';
export const fullImageSelector = '.popup_type_image';
export const profileNameSelector = '.profile__title';
export const profileInfoSelector = '.profile__subtitle';

// Список карточек
export const cardsTemplate = '.cards-template';
// Переменная popup
const profilePopup = document.querySelector('.popup_type_profile-edit'); // попап профиля
// Переменные формы
export const nameInput = profilePopup.querySelector('.popup__input_field_name'); // поле ввода профиля
export const jobInput = profilePopup.querySelector('.popup__input_field_description'); // поле ввода рода деятельности
// Переменные кнопок
export const popupOpenBtn = document.querySelector('.profile__edit-button'); // редактирование профиля
export const addCard = document.querySelector('.profile__add-button'); // добавить карточку
// Список карточек в разметке
export const cardsList = document.querySelector('.cards__list');
// Объект для форм
export const formValidators = {}

// Массив из задания
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Валидация форм из задания
export const configValidator = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  popupCloseBtn: '.popup__close-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__input-error'
}