export default class UserInfo {
  constructor({usernameSelector, descriptionSelector, avatarSelector}) {
    this._username = document.querySelector(usernameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._description.textContent
    };
  }

  setUserInfo(name, about) {
    this._username.textContent = name;
    this._description.textContent = about;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
