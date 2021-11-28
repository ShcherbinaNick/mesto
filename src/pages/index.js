import './index.css'

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirmation} from "../components/PopupWithConfirmation.js"
import { Api } from '../components/Api.js';

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
  configValidator,
  avatarPopupSelector,
  avatarImageSelector,
  avatarEditBtn,
  popupWithConfirmationSelector
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '47f8c499-4c8d-4d07-9fbb-42aad97eb271',
    'Content-Type': 'application/json'
  }
});

let userId = null;

Promise.all([ api.getInitialCards(), api.getUserInfo() ])
  .then(([dataCards, dataUser]) => {
    userId = dataUser._id;
    newUser.setUserInfo(dataUser);
    newUser.setUserAvatar(dataUser)
    cardSection.renderItems(dataCards);
  })

const confirmationPopup = new PopupWithConfirmation(popupWithConfirmationSelector)

// Функция конструирования одной карточки, возвращает элемент
const createCard = (cardData) => {
  const newCard = new Card({
    data: {...cardData, currentUserId: userId},
     handleCardClick: () => {
      popupWithImage.open(cardData)
     },
     setLikeCallback: (cardId) => {
      api.setCardLike(cardId)
        .then((dataCard) => {
          newCard.like(dataCard)
        })
        .catch(err => console.log(err))
     },
     removeLikeCallback: (cardId) => {
      api.removeCardLike(cardId)
        .then(dataCard => newCard.like(dataCard))
        .catch(err => console.log(err))
     },
     cardDeleteCallback: (cardId) => {
      confirmationPopup.open()
      formValidators.card_delete.enableBtn()
      confirmationPopup.submitAction(() => {
        api.removeCard(cardId)
          .then((res) => {
            confirmationPopup.close()
            newCard.deleteCard()
          })
          .catch((err) => {
            console.log(err)
          })
      })
     }
    }, cardsTemplate)
    return newCard.generateCard()
  }

// Создание экземпляра Section
const cardSection = new Section({
  renderer: data => {
    cardSection.addItem(createCard(data));
  }
}, cardsList)

// Создать экземпляры для popupWithImage и popupWithForm
const newUser = new UserInfo(profileNameSelector, profileInfoSelector, avatarImageSelector)

const profilePopupWithForm = new PopupWithForm(
  profileSelector, (inputValues) => {
    profilePopupWithForm.toggleLoading(true)
    api.setUserInfo(inputValues)
      .then(res => {
      newUser.setUserInfo(res);
      profilePopupWithForm.close();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        profilePopupWithForm.toggleLoading(false)
      })
  }
)

// Экземпляр попапа для редактирования картинки аватарки
const avatarPopupWithForm = new PopupWithForm(
    avatarPopupSelector , ({"profile-edit-avatar": link}) => {
      avatarPopupWithForm.toggleLoading(true)
      api.setAvatar(link)
        .then((res) => {
          newUser.setUserAvatar(res)
          avatarPopupWithForm.close()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(()=>{
          avatarPopupWithForm.toggleLoading(false)
        })
})

avatarEditBtn.addEventListener("click", () => {
  avatarPopupWithForm.open()
})

// Новый экземпляр попапа с формой для попапа добавления карточек
const cardPopupWithForm = new PopupWithForm(
  cardEditSelector, (inputValues) => {
    const newCardData = {}
    newCardData.name = inputValues["card-input-name"]
    newCardData.link = inputValues["card-input-link"]
    profilePopupWithForm.toggleLoading(true)
    api.postCard(newCardData)
      .then((res) => {
        cardSection.addItem(createCard(res))
        cardPopupWithForm.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        profilePopupWithForm.toggleLoading(false)
      })
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

enableValidate(configValidator);
