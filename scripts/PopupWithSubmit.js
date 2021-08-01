// Для подтверждения при удалении карточки
import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._form = selectorPopup.querySelector(".popup__form");
    this._handleDeleteCard = null;
    this._popupButton = this._form.querySelector(".popup__button");
    this._popupButtonText = this._popupButton.textContent;
  }

  changeFunction(deleteCard) {
    this._handleDeleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard();
      this.close();
    });
  }
}
