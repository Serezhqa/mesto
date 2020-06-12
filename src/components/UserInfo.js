export default class UserInfo {
  constructor({usernameSelector, descriptionSelector}) {
    this._username = document.querySelector(usernameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.username = this._username.textContent;
    this._userInfo.description = this._description.textContent;
    return this._userInfo;
  }

  setUserInfo({username, description}) {
    this._username.textContent = username;
    this._description.textContent = description;
  }
}
