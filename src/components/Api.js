export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  // getInitialCards() {
  //
  // }

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
}
