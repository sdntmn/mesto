export class Card {
  _data;
  _templateSelector;
  _handleCardClick;

  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._elementTemplate = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick; // функция колбэк открытия попап с картинкой при клике на карточку.
  }

  //функция возвращала DOM-элемент.
  _getTemplate = () => {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = this._elementTemplate.content
      .querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__img");
    this._setEventListeners();

    this._elementImg.alt = `Фото. ${this._data.name}`;
    this._element.querySelector(".element__name-mesto").textContent =
      this._data.name;
    this._elementImg.src = this._data.link;
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
        this._handleCardClick();
      });
  }
}
