import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupFoto = popupElement;
    this._popupImg = this._popupFoto.querySelector(".popup__img");
    this._popupImgName = this._popupFoto.querySelector(".popup__img-name");
  }

  // перезаписывает родительский метод: вставляет в попап картинку,
  //   атрибут src изображения и подпись к картинке ==========================
  open(data) {
    this._popupImg.src = data.link;
    this._popupImg.alt = `Фото. ${data.name}`;
    this._popupImgName.textContent = data.name;
    super.open();
  }
}
