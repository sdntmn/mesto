// Отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(selectorNameUser, selectorInfo, selectorAvatar) {
    this._selectorNameUser = selectorNameUser;
    this._selectorInfo = selectorInfo;
    this._selectorAvatar = selectorAvatar;
    this._nameUser = "";
    this._aboutUser = "";
    this._avatarUser = "";
  }
  // Принимает новые данные пользователя ============================
  setUserInfo({ name, about }) {
    this._nameUser = name; // input.snp;
    this._aboutUser = about; // input.job
  }

  // Принимает новый аватар пользователя ============================
  setUserAvatar({ avatar }) {
    this._avatarUser = avatar;
  }
  // Возвращает объект с данными пользователя========================
  getUserInfo() {
    return {
      name: this._nameUser,
      about: this._aboutUser,
    };
  }

  // Возвращает аватар пользователя===================================
  getUseravatar(data) {
    return {
      avatar: this._avatarUser,
    };
  }

  //Обновление данных на странице ===================================
  updateUserInfo() {
    this._selectorNameUser.textContent = this._nameUser;
    this._selectorInfo.textContent = this._aboutUser;
  }

  //Обновление аватара на странице ===================================
  updateUserAvatar() {
    this._selectorAvatar.src = this._avatarUser;
  }
}
