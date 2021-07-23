export class Api {
  constructor(configApi) {
    this._url = configApi.baseUrl; // тело конструктора
    console.log(this._url);
    this._headers = configApi.headers;
    console.log(this._headers);
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
