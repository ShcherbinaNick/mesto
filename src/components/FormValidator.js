export class FormValidator {
  constructor(form, config) {
    this._formElement = form;
    this._config = config;
    this._inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputErrorClass = this._config.inputErrorClass
    this._inactiveButtonClass = this._config.inactiveButtonClass
  }
  // Прячет ошибку валидации
  _hideInputError(inputElement) {
    const inputError = this._formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
  }
  // Показывает ошибку валидации
  _showInputError(inputElement, errorElement) {
    const inputError = this._formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = errorElement;
  }
  // Функция, делающая кнопку неактивной после создания карточки
  _disableBtn() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  // Функция, делающая кнопку активной
  _enableBtn() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
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
      this._disableBtn();
    } else {
      this._enableBtn();
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
  // Очистка ошибок
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  // Установка листнеров на инпуты
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    }
  // Включает валидацию
  enableValidate() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableBtn();
    });
    this._setEventListeners();
    this._disableBtn();
  }
}