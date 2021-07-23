// Для подтверждения при удалении карточки
import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(selectorPopup, { submit }) {
    super(selectorPopup);
    this._submit = submit;
  }

  /* у него переопределяется метод setEventListeners немного по-другому, нежели вы это делали в классе PopupWithForm - в нем вы передавали туда значения всех инпутов. Теперь же туда ничего не надо передавать, а просто вызывать функцию при сабмите. Соответственно никаких других методов у этого попапа не будет, так как нет формы которую надо валидировать.*/

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });
  }
}