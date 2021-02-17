export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
      method: 'GET',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a'
      }
    })
    .then((res) =>  {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postCard(card) {
   return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
     return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  editUserInfo(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: info.nameProfile,
        about: info.job
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        console.log(data);
      });
  }

  editAvatarUser(info) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: info.avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}
