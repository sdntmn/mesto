// Отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(selectorNameUser, selectorInfo, selectorAvatar) {
    this._selectorNameUser = selectorNameUser;
    this._selectorInfo = selectorInfo;
    this._selectorAvatar = selectorAvatar;
  }
  // Принимает новые данные пользователя ============================
  setUserInfo(data) {
    if (data.name) {
      this._selectorNameUser.textContent = data.name;
    }
    if (data.about) {
      this._selectorInfo.textContent = data.about;
    }
    if (data.avatar) {
      this.setUserAvatar(data);
    }
  }

  // Принимает новый аватар пользователя ============================
  setUserAvatar(data) {
    if (data.avatar) {
      this._selectorAvatar.src = data.avatar;
    }
  }
  // + Возвращает объект с данными пользователя========================
  getUserInfo() {
    return {
      name: this._selectorNameUser.textContent,
      about: this._selectorInfo.textContent,
    };
  }

  // Возвращает аватар пользователя===================================
  getUserAvatar() {
    return {
      avatar: this._selectorAvatar.textContent,
    };
  }
}
