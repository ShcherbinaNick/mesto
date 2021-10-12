// Переменная popup
const popup = document.querySelector('.popup'); // позиционирование и скрытие попапа
const profilePopup = document.querySelector('.popup_type_profile-edit'); // попап профиля
const cardItemPopup = document.querySelector('.popup_type_new-card'); // попап создания карточки
const imagePopup = document.querySelector('.popup_type_image'); // попап отображения картинки
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
const nameInput = popup.querySelector('.popup__input-field-name'); // поле ввода профиля
const jobInput = popup.querySelector('.popup__input-field-description'); // поле ввода рода деятельности
// Переменные полей формы создания карточки
const cardInputText = document.querySelector('.popup__input-field-card');
const cardInputLink = document.querySelector('.popup__input-field-link');
// Переменные для попаса с увеличенным изображением картинки
const imagePopupPicture = imagePopup.querySelector('.popup__figure-image');
const imagePopupTitle = imagePopup.querySelector('.popup__figure-title');
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

// Список карточек в разметке
const cardsList = document.querySelector('.cards__list');

// Преобразование элементов массива
function createCard(card) {
  const cardsTemplate = document.querySelector('.cards-template');
  const newCard = cardsTemplate.content.cloneNode(true);
  const newCardName = newCard.querySelector('.card__name');
  const newCardImage = newCard.querySelector('.card__image');
  const likeBtn = newCard.querySelector('.card__like-button');
  newCardName.textContent = card.name;
  newCardImage.src = card.link;
  // Лайк на каждую созданную карточку
  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });
  // Удаление карточки
  const deleteCardBtn = newCard.querySelector('.card__delete');
  deleteCardBtn.addEventListener('click', deleteCard);
  // Открытие картинки
  const fullImage = newCard.querySelector('.card__image');
  fullImage.addEventListener('click', () => {
    openImage(newCardImage.src, newCardImage.alt, newCardName.textContent);
  });

  return newCard;
}

function renderCards(item) {
  const newCard = createCard(item);
  cardsList.append(newCard);
}

initialCards.map(renderCards);

// Открытие popup
function openPopup(item) {
  item.classList.add('popup_active');
};

popupOpenBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(profilePopup);
});

// Закрытие попапов
popupCloseBtns.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'));
  });
});

function closePopup(item) {
  item.classList.remove('popup_active');
};

// Отвечает за открытие попапа с добавлением карточки
addCard.addEventListener('click', () => {
  openPopup(cardItemPopup);
});

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
}
cardFormElement.addEventListener('submit', addNewCard);

// Лайк
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(profilePopup);
}
profileFormElement.addEventListener('submit', formSubmitHandler);

// Удаление карточки
function deleteCard(evt) {
  evt.currentTarget.closest('.card').remove();
}

// Значения для попапа с увеличенным просмотром картинки
function openImage(image, alt, figcaption) {
imagePopupPicture.src = image;
imagePopupPicture.alt = alt;
imagePopupTitle.textContent = figcaption;
openPopup(imagePopup);
}