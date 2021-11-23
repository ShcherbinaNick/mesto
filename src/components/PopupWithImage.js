import Popup from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popupElement.querySelector('.popup__figure-image');
    this._popupTitle = this._popupElement.querySelector('.popup__figure-title');
  }
  open(data) {
    super.open()
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupTitle.textContent = data.name;
  }
}