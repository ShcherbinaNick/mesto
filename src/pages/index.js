import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { profileSelector,
  cardEditSelector,
  fullImageSelector,
  profileNameSelector,
  profileInfoSelector,
  cardsTemplate,
  popupOpenBtn,
  addCard,
  nameInput,
  jobInput,
  cardsList,
  formValidators,
  initialCards,
  config
} from '../utils/constants.js'

// Функция конструирования одной карточки, возвращает элемент
const createCard = (cardData) => {
  const newCard = new Card ({ 
    data: cardData,
   handleCardClick: () => {
    popupWithImage.open(cardData)
   } 
  }, cardsTemplate)
  return newCard.generateCard()
}

// Создание экземпляра Section
const cardSection = new Section({
  items: initialCards,
  renderer: data => {
    cardSection.addItem(createCard(data));
  }
}, cardsList)
cardSection.renderItems();

// Создать экземпляры для popupWithImage и popupWithForm
const newUser = new UserInfo(profileNameSelector, profileInfoSelector)

const profilePopupWithForm = new PopupWithForm(
  profileSelector, (inputValues) => {
    newUser.setUserInfo(inputValues)
    profilePopupWithForm.close();
  }
)

// Новый экземпляр попапа с формой для попапа добавления карточек
const cardPopupWithForm = new PopupWithForm(
    cardEditSelector, (inputValues) => {
      const newCardData = {}
      newCardData.name = inputValues["card-input-name"]
      newCardData.link = inputValues["card-input-link"]
      cardSection.addItem(createCard(newCardData))
      cardPopupWithForm.close()
    }
)

const popupWithImage = new PopupWithImage(fullImageSelector)

popupOpenBtn.addEventListener('click', () => {
  formValidators[ 'profile_edit' ].resetValidation();
  const currentUser = newUser.getUserInfo()
  nameInput.value  = currentUser.name;
  jobInput.value = currentUser.info;
  profilePopupWithForm.open();
});

// Отвечает за открытие попапа с добавлением карточки
addCard.addEventListener('click', () => {
  formValidators[ 'card_edit' ].resetValidation();
  cardPopupWithForm.open();
});

// Включение валидации
const enableValidate = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validateForm = new FormValidator(formElement, config)
    formValidators[ formElement.name ] = validateForm;
    validateForm.enableValidate();
  });
};

enableValidate(config);