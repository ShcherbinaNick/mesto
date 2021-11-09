// Валидация форм из задания
const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  popupCloseBtn: '.popup__close-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__input-error',
}

class FormValidator {
  constructor(form, config) {
    this._formElement = form;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._closeButton = this._formElement.querySelector(config.popupCloseBtn);
  }
  // Прячет ошибку валидации
  _hideInputError(inputElement) {
    const inputError = this._formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.remove(config.inputErrorClass);
    inputError.textContent = '';
  }
  // Показывает ошибку валидации
  _showInputError(inputElement, errorElement) {
    const inputError = this._formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(config.inputErrorClass);
    inputError.textContent = errorElement;
  }
  // Возвращает, есть ли в форме невалидные поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // Переключение кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  // Проверка на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  // Установка листнеров на инпуты
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._closeButton.addEventListener('click', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      this._formElement.reset();
    });
  }
  // Включает валидацию
  enableValidate() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault;
    });
    this._setEventListeners();
  }
}

export { config, FormValidator }