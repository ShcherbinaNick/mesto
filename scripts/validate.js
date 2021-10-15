// Валидация форм из задания
const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__input-error'
};

// Прячет ошибку валидации
const hideInputError = (formElement, inputElement, config) => {
  const inputError = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  inputElement.classList.remove(config.inputErrorClass);
  inputError.textContent = '';
}

// Показывает ошибку валидации
const showInputError = (formElement, inputElement, errorElement, config) => {
  const inputError = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  inputElement.classList.add(config.inputErrorClass);
  inputError.textContent = errorElement;
}

// Возвращает, есть ли в форме невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Переключение кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Проверка на валидность
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  };
};

// Установка листнеров на инпуты
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  })
}

// Включает валидацию
const enableValidate = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault;
    });
    setEventListeners(formElement, config);
  });
}
enableValidate(config);