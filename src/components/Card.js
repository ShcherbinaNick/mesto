class Card {
  constructor({data, handleCardClick, setLikeCallback, removeLikeCallback, cardDeleteCallback}, cardSelector) {
    this._data = data
    this._userId = data.currentUserId
    this._name = this._data.name;
    this._image = this._data.link;
    this._alt = this._data.name;
    this._likes = this._data.likes;
    this.cardId = this._data._id;
    this._currentUserId = this._data.currentUserId
    this._cardOwnerId = this._data.owner._id
    this._cardSelector = cardSelector;
    this._card = this._getTemplate(); // Записываем разметку в приватное поле, чтобы элементы получили доступ
    this._figcaption = this._data.name;
    this._cardName = this._card.querySelector('.card__name');
    this._cardImage = this._card.querySelector('.card__image');
    this._likeBtn = this._card.querySelector('.card__like-button');
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._deleteButton = this._card.querySelector('.card__delete')
    this._handleCardClick = handleCardClick;
    this._setLike = setLikeCallback;
    this._likeRemove = removeLikeCallback;
    this._cardDeleteCallback = cardDeleteCallback
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
    if (this.isLiked()) {
      this._likeBtn.classList.add('card__like-button_active');
    }
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove()
    }
    this._likeCounter.textContent = this._likes.length;
    this._setEventListeners();
    return this._card
  }
  isLiked() {
    return this._likes.some(user => user._id === this._currentUserId)
  }
  _handleLike() {
    if (this.isLiked()) {
      this._likeRemove(this.cardId)
    } else {
      this._setLike(this.cardId)
    }
  }
  like(likeData) {
    this._likes = likeData.likes
    this._likeCounter.textContent = this._likes.length
    this._likeBtn.classList.toggle('card__like-button_active');
  }
  deleteCard() {
    this._card.remove();
  }
  // Установка слушателей в одном приватном методе
  _setEventListeners() {
    // Лайк
    this._likeBtn.addEventListener('click', () => {
      this._handleLike();
    });
    // Удаление
    this._deleteButton.addEventListener('click', () => {
      this._cardDeleteCallback(this.cardId)
    });
    // Открытие картинки
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

export { Card }