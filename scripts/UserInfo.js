// Отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(selectorNameUser, selectorInfo) {
    this._selectorNameUser = selectorNameUser;
    console.log(this._selectorNameUser);
    this._selectorInfo = selectorInfo;
  }

  // возвращает объект с данными пользователя========================
  getUserInfo() {
    const dataUser = {
      userName: this._selectorNameUser.textContent,
      userJob: this._selectorInfo.textContent,
    };

    return dataUser;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(input) {
    this._selectorNameUser.textContent = input.snp;
    console.log(this._selectorNameUser.textContent);
    this._selectorInfo.textContent = input.job;
  }
}
