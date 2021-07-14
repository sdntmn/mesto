// отвечает за открытие и закрытие попапа

export class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup; // селектор попапа
  }

  // открытие попапа ==============================================
  open() {
    console.log("открыли");
    this._selectorPopup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose); // навесили слушателя
    this.setEventListeners();
  }

  // закрытие попапа. ==============================================
  close() {
    console.log("закрыли");
    this._selectorPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // закрытие попапа по клавише ESC ========================== Переписать
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      openedPopup.classList.remove("popup_is-opened");
      //this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа ========= по полю ?????
  setEventListeners() {
    this._selectorPopup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target === evt.currentTarget
      ) {
        this.close();
      }
    });
  }
}
