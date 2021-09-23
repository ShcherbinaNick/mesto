// Переменная popup
let popup = document.querySelector('.popup')
// Переменные кнопок
let popupOpenBtn = document.querySelector('.profile__edit-button')
let popupCloseBtn = popup.querySelector('.popup__close-button')
let likeBtn = document.querySelector('.cards__like-button')
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

// Функциональность лайков. Пока она работает на одну карточку, наверное,
// для отображения на всех карточках нужно писать
// массив. Вроде этого не просят делать,
// поэтому я пока решил оставить так. Если нужно, поправлю
function likeToggle() {
  likeBtn.classList.toggle('cards__like-button_active')
}

// Отслеживание событий нажатия на лайк
likeBtn.addEventListener('click', likeToggle)

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