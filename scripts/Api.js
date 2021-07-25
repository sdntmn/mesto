export class Api {
  constructor(configApi) {
    this._url = configApi.baseUrl; // тело конструктора
    console.log(this._url);
    this._headers = configApi.headers;
    console.log(this._headers);
  }

  // Проверка работы промиса ======================================================
  _checkResponsPromise(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          console.log(`Ошибка № ${res.status}  Текст ошибки: ${res.statusText}`)
        );
  }
  // Получить список всех карточек в виде массива (GET) ===========================
  getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then(this._checkResponsPromise);
  }

  // Добавить карточку (POST) =====================================================
  setCardUser() {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
    }).then(this._checkResponsPromise);
  }

  // Получить данные пользователя (GET) ==========================================
  getDataUser(dataUser) {
    return fetch(this._url + "/users/me ", {
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then(this._checkResponsPromise);
  }

  //Для синхронного первоначального вывода данных пользователя и карточек на страницу
  renderFirstData() {
    return Promise.All([this.getDataUser()], [this.getInitialCards()]);
  }

  // Запрос данных для лайка карточки ============================================
  getLikeCardId() {
    return fetch(this._url + "/cards/likes/cardId ", {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponsPromise);
  }

  // Заменить данные пользователя (PATCH) ========================================
  /* changeDataUser(data) {
    console.log(data);
    return fetch(this._url + "/users/me ", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponsPromise);
  }

  // Обработка данных 2-ух промисов changeDataUser и getDataUser ================
  processGetDataAndChangeData() {
    return Promise.All([this.getDataUser()], [this.changeDataUser()]);
    
  }
  */
}
