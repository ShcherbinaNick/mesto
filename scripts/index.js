// Переменная popup
let popup = document.querySelector('.popup')
// Переменные кнопок
let popupOpenBtn = document.querySelector('.profile__edit-button')
let popupCloseBtn = popup.querySelector('.popup__close-button')
// Переменные полей профиля
let profileName = document.querySelector('.profile__title')
let profileDesc = document.querySelector('.profile__subtitle')
// Переменные формы
let formElement = popup.querySelector('.popup__container')
let nameInput = popup.querySelector('.popup__input_field_name')
let jobInput = popup.querySelector('.popup__input_field_description')

// Открытие popup
function popupOpen() {
  popup.classList.add('popup_active')
  nameInput.value = profileName.textContent
  jobInput.value = profileDesc.textContent
}

// Закрытие popup
function popupClose() {
  popup.classList.remove('popup_active')
}

// Отслеживание событий клика открытия и закрытия окна
popupOpenBtn.addEventListener('click', popupOpen)
popupCloseBtn.addEventListener('click', popupClose)

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  profileName.textContent = nameInput.value 
  profileDesc.textContent = jobInput.value
  popupClose();
  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 