// Для подтверждения при удалении карточки
import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = popupElement.querySelector(".popup__form");
    this._handleDeleteCard = null;
  }

  // подмена функции при нажатии удаления на подтверждение на удаление =======
  changeFunction(deleteCard) {
    this._handleDeleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard();
    });
  }
}
