function onResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

export class Api{
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(onResponse)
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then(onResponse)
  }
  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: userData["profile-input-name"],
        about: userData["profile-input-description"]
      })
    })
    .then(onResponse)
  }
  setAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
        })
    })
    .then(onResponse)
  }
  setCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(onResponse)
  }
  removeCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onResponse)
  }
  postCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method:  "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
        })
    })
    .then(onResponse)
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onResponse)
  }
}
