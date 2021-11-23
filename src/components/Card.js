class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this._card = this._getTemplate(); // Записываем разметку в приватное поле, чтобы элементы получили доступ
    this._figcaption = data.name;
    this._cardName = this._card.querySelector('.card__name');
    this._cardImage = this._card.querySelector('.card__image');
    this._likeBtn = this._card.querySelector('.card__like-button');
    this._handleCardClick = handleCardClick;
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
    this._cardName.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._card
  }
  // Приватные методы
  _like() {
    this._likeBtn.classList.toggle('card__like-button_active');
  }
  _deleteCard() {
    this._card.remove();
  }
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
      this._handleCardClick();
    });
  }
}

export { Card }