const popupFoto = document.querySelector("#popup_foto_mesto");
const elementTemplate = document.querySelector("#template-element");
const popupImg = document.querySelector(".popup__img");
const popupImgName = document.querySelector(".popup__img-name");

export class Card {
  _data;
  constructor(data) {
    this._data = data;
  }
  _getTemplate() {
    const cardElement = elementTemplate.content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".element__img"
    ).alt = `Фото. ${this._data.name}`;
    this._element.querySelector(".element__name-mesto").textContent =
      this._data.name;
    this._element.querySelector(".element__img").src = this._data.link;
    return this._element;
  }

  _onDelete = () => {
    if (this._element.querySelector(".element__trash")) {
      this._element.remove();
    }
  };

  _likeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleOpenPopup() {
    popupImg.src = this._data.link;
    popupImg.alt = `Фото. ${this._data.name}`;
    popupImgName.textContent = this._data.name;
    popupFoto.classList.add("popup_is-opened");
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._likeClick();
      });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", (evt) => {
        this._onDelete(evt);
      });
    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
  }
}
