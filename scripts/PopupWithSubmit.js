// Для подтверждения при удалении карточки
import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._form = selectorPopup.querySelector(".popup__form");
    this._handleDeleteCard = null;
  }

  /* у него переопределяется метод setEventListeners немного по-другому, нежели вы это делали в классе PopupWithForm - в нем вы передавали туда значения всех инпутов. Теперь же туда ничего не надо передавать, а просто вызывать функцию при сабмите. Соответственно никаких других методов у этого попапа не будет, так как нет формы которую надо валидировать.*/

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard();
      this.close();
    });
  }

  changeFunction(deleteCard) {
    this._handleDeleteCard = deleteCard;
  }
}
