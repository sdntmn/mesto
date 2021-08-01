import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, { submit }) {
    // принимает в конструктор селектор попапа и колбэк сабмита формы
    super(selectorPopup);

    this._submit = submit; // колбэк сабмита формы
    this._form = selectorPopup.querySelector(".popup__form"); // форма попапа
    this._getInputValues = this._getInputValues.bind(this);
    this._popupButton = this._form.querySelector(".popup__button");
    this._popupButtonText = this._popupButton.textContent;
  }

  // собирает данные всех полей формы=====================================
  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this.data = {};
    this._inputList.forEach((input) => {
      this.data[input.name] = input.value;
    });
    return this.data;
  }

  changeTextButton(load) {
    if (load) {
      this._popupButton.textContent = "Сохранение...";
    } else {
      this._popupButton.textContent = this._popupButtonText;
    }
  }

  // Перезаписывает родительский метод (устанавлевает слушателя клика по иконке закрытия попапа) и добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  // Перезаписывает родительский метод close, так как форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }
}
