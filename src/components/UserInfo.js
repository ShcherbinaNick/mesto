export class UserInfo{
  constructor(nameSelector, infoSelector, avatarImageSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarImageSelector)
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent 
    }
  }
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar
  }
}
