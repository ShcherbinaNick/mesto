export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector)
    this._boundHandleEscClose = this._handleEscClose.bind(this);
    this._boundHandleClickClose = this._handleClickClose.bind(this);
  }
  open() {
    this.setEventListeners();
    this._popupElement.classList.add('popup_active');
  } 
  close() {
    this._popupElement.classList.remove('popup_active');
    document.removeEventListener('keydown', this._boundHandleEscClose);
    document.removeEventListener('mousedown', this._boundHandleClickClose);
  }
  _handleClickClose(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._boundHandleClickClose)
    document.addEventListener('keydown', this._boundHandleEscClose)
  }
}