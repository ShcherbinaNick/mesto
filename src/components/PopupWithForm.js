import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector)
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.popup__container');
    this._boundFormSubmitHandler = this._submitHandler.bind(this);
    this._boundGetInputValues = this._getInputValues.bind(this);
    this._popupElements = this._popupElement.querySelectorAll('.popup__input')
  }
  _getInputValues() {
    this._inputsData = {};
    this._popupElements.forEach(input => {
      this._inputsData[input.name] = input.value;
    })
    return this._inputsData;
  }
  _submitHandler(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this._boundGetInputValues());
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._boundFormSubmitHandler)
  }
  close() {
    super.close()
    this._form.reset()
    this._form.removeEventListener('submit', this._boundFormSubmitHandler)
  }
}