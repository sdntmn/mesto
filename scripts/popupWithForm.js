import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, { submit }) {
    // принимает в конструктор селектор попапа и колбэк сабмита формы
    super(selectorPopup);

    this._submit = submit; // колбэк сабмита формы
    this._form = selectorPopup.querySelector(".popup__form"); // форма попапа
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  // Перезаписывает родительский метод (устанавлевает слушателя клика по иконке закрытия попапа) и добавляет обработчик сабмита формы
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      super.setEventListeners();
    });
  }

  // Перезаписывает родительский метод close, так как форма должна ещё и сбрасываться.
  close() {
    this._form.reset();
    super.close();
  }
}
