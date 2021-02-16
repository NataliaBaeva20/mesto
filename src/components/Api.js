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
      return res.json();
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
      .then(res => res.json());
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
      }
    })
      .then(res => res.json());
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
      }
    })
      .then(res => res.json());
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
      }
    })
      .then(res => res.json());
  }

  getUserInfo() {
     return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a'
      }
    })
      .then(res => res.json());
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
      .then(res => res.json())
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
      .then(res => res.json());
  }
}
