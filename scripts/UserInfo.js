// Отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(selectorNameUser, selectorInfo) {
    this._selectorNameUser = selectorNameUser;
    this._selectorInfo = selectorInfo;
    this._nameUser = "";
    this._aboutUser = "";
  }
  // Принимает новые данные пользователя ============================
  setUserInfo({ name, about }) {
    this._nameUser = name; // input.snp;
    this._aboutUser = about; // input.job
  }

  // Возвращает объект с данными пользователя========================
  getUserInfo(data) {
    console.log(data);
    return {
      name: this._nameUser, // input.snp;
      about: this._aboutUser, // input.job
    };
  }

  //Обновление данных на странице ===================================
  updateUserInfo() {
    this._selectorNameUser.textContent = this._nameUser;
    this._selectorInfo.textContent = this._aboutUser;
  }
}
