import { baseURL } from "../utils/constants";

export default class Api {
  constructor(baseURL, token) {
    this._baseURL = baseURL;
    this._token = token;
  }

  getUserInfo() {
    return fetch(this._baseURL + '/users/me', {
      headers: {
        authorization: this._token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserInfo(formData) {
    return fetch(this._baseURL + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {
    return fetch(this._baseURL + '/cards', {
      headers: {
        authorization: this._token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  uploadCard(formData) {
    return fetch(this._baseURL + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  likeCard(id, liked) {
    if (liked) {
      return fetch(this._baseURL + '/cards/likes/' + id, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
    } else {
      return fetch(this._baseURL + '/cards/likes/' + id, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  }

  deleteCard(id) {
    return fetch(this._baseURL + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  changeAvatar(link) {
    return fetch(this._baseURL + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
