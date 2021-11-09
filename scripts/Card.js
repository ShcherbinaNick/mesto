import { openPopup } from './index.js'

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this._figcaption = data.name;
  }
  
  // Получаем шаблон разметки и возвращаем DOM-элемент
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }
  // Наполняем карточку данными, единственный публичный метод
  generateCard() {
    this._card = this._getTemplate(); // Записываем разметку в приватное поле, чтобы элементы получили доступ
    this._setEventListeners();
    this._card.querySelector('.card__name').textContent = this._name;
    this._card.querySelector('.card__image').src = this._image;
    this._card.querySelector('.card__image').alt = this._name;
    return this._card
  }
  // Приватные методы
  _like() {
    this._card.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }
  _deleteCard() {
    document.querySelector('.card').remove();
  }
  _openImage() {
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupPicture = imagePopup.querySelector('.popup__figure-image');
    const imagePopupTitle = imagePopup.querySelector('.popup__figure-title');
    imagePopupPicture.src = this._image;
    imagePopupPicture.alt = this._alt;
    imagePopupTitle.textContent = this._figcaption;
  openPopup(imagePopup);
  };
  // Установка слушателей в одном приватном методе
  _setEventListeners() {
    // Лайк
    this._card.querySelector('.card__like-button').addEventListener('click', () => {
      this._like();
    });
    // Удаление
    this._card.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    // Открытие картинки
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._openImage();
    });
  }
}

export { Card }