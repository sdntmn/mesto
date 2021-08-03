// отвечает за открытие и закрытие попапа

export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // открытие попапа =========================================================
  open() {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose); //навесили слуш
  }

  // закрытие попапа. ========================================================
  close() {
    this._popupElement.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", this._handleEscClose); //удалили сл
  }

  // закрытие попапа по клавише ESC ==========================================
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа и по полю ==============
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target === evt.currentTarget
      ) {
        this.close();
      }
    });
  }
}
