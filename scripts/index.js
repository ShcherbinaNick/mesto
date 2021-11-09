import { Card } from './Card.js'
import { config, FormValidator } from './FormValidator.js'

// Переменная popup
const profilePopup = document.querySelector('.popup_type_profile-edit'); // попап профиля
const cardItemPopup = document.querySelector('.popup_type_new-card'); // попап создания карточки
// Переменные кнопок
const popupOpenBtn = document.querySelector('.profile__edit-button'); // редактирование профиля
const popupCloseBtns = document.querySelectorAll('.popup__close-button'); // закрыть
const addCard = document.querySelector('.profile__add-button'); // добавить карточку
// Переменные полей профиля
const profileName = document.querySelector('.profile__title'); // название профиля
const profileDesc = document.querySelector('.profile__subtitle'); // род деятельности профиля
// Переменные формы
const profileFormElement = document.forms.profile_edit; // попап с редактированием информации пользователя
const cardFormElement = document.forms.card_edit; // попап добавления новой карточки
const nameInput = profilePopup.querySelector('.popup__input_field_name'); // поле ввода профиля
const jobInput = profilePopup.querySelector('.popup__input_field_description'); // поле ввода рода деятельности
// Переменные полей формы создания карточки
const cardInputText = document.querySelector('.popup__input_field_card');
const cardInputLink = document.querySelector('.popup__input_field_link');
// Список карточек в разметке
const cardsList = document.querySelector('.cards__list');
// Попапы
const popups = document.querySelectorAll('.popup');
// Список карточек
const cardsTemplate = '.cards-template';
// Массив из задания
const initialCards = [
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
// Добавление карточек
const renderCards = (item) => {
  const newCard = new Card(item, cardsTemplate);
  const newCardElement = newCard.generateCard();
  cardsList.prepend(newCardElement);
}
initialCards.map(renderCards);

// Открытие popup
function openPopup(item) {
  item.classList.add('popup_active');
  setEscape();
};

popupOpenBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(profilePopup);
});

// Закрытие попапов
function closePopup(item) {
  item.classList.remove('popup_active');
  removeEscape();
};

popupCloseBtns.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'));
  });
});

// Отвечает за открытие попапа с добавлением карточки
addCard.addEventListener('click', () => {
  openPopup(cardItemPopup);
});

// Функция, делающая кнопку неактивной после создания карточки
function disableBtn(formElement) {
  const btn = formElement.querySelector('.popup__save-button');
  btn.classList.add('popup__save-button_disabled');
  btn.disabled = true;
}

// Добавление карточки при нажатии на кнопку
function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardInputText.value,
    link: cardInputLink.value
  }
  renderCards(newCard);
  closePopup(cardItemPopup);
  cardInputText.value = ''; // Очистка полей при закрытии
  cardInputLink.value = ''; // Очистка полей при закрытии
  disableBtn(cardItemPopup);
};
cardFormElement.addEventListener('submit', addNewCard);

// Редактирование профиля
function submitFormHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(profilePopup);
  disableBtn(profilePopup);
}
profileFormElement.addEventListener('submit', submitFormHandler);

//Закрытие попапа по нажатию на оверлей
popups.forEach((element) => {
  element.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.target);
    };
  });
});

//Закрытие попапа по нажатию на esc
function closeEsc(event) {
  const currentPopup = document.querySelector('.popup_active');
  if (event.key === 'Escape') {
    closePopup(currentPopup);
  };
};

function setEscape() {
  document.addEventListener('keydown', closeEsc);
};

function removeEscape() {
  document.removeEventListener('keydown', closeEsc);
};

// Включение валидации
const enableValidate = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validateForm = new FormValidator(formElement, config)
    validateForm.enableValidate();
  });
};

enableValidate(config);

export { openPopup }