import Popup from "../components/Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popupElement.querySelector('.popup__container')
    this._formSubmitBind = this._formSubmit.bind(this)
    this._button = this._form.querySelector('.popup__save-button')
  }
  submitAction(action) {
    this._action = action
  }
  _formSubmit(evt) {
    evt.preventDefault()
    this._action()
  }
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._formSubmitBind)
  }

}
