class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._userInfo = {};
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`).catch((value) => {
        console.log(value);
      });
    }

    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._getResponseData)
      .then((data) => {
        return data;
      });
  }

  changeUserInfo({ name, about, avatar }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar,
      }),
    }).then(this._getResponseData);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  likeCard(cardId, liked) {
    if (!liked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
        .then(this._getResponseData)
        .then((data) => {
          return data;
        });
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(this._getResponseData)
        .then((data) => {
          return data;
        });
    }
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponseData);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "3faaff2f-7f8a-4209-88be-1532ab796c48",
    "Content-Type": "application/json",
  },
});
