// отвечает за открытие и закрытие попапа

export class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup; // селектор попапа
    console.log(this._selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // открытие попапа ==============================================
  open() {
    this._selectorPopup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose); // навесили слушателя
  }

  // закрытие попапа. ==============================================

  close() {
    this._selectorPopup.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", this._handleEscClose); // удалили слушателя
  }

  // закрытие попапа по клавише ESC ================================
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа и по полю =====
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
