export class Card {
  _data;
  _templateSelector;
  _handleCardClick;

  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleClickLike
  ) {
    this._data = data;
    this.idCard = data.owner._id; // id - карточки
    this._likes = data.likes.length;
    this._elementTemplate = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick; // функция колбэк открытия попап с картинкой при клике на карточку.
    this._handleDeleteCard = handleDeleteCard;
    this._handleClickLike = handleClickLike;
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

  generateCard(userId) {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__img");
    this._elementDel = this._element.querySelector(".element__trash");
    if (userId === this.idCard) {
      this._elementDel = this._elementDel.classList.add("element_is-visible");
    }
    this._setEventListeners();
    this._elementImg.alt = `Фото. ${this._data.name}`;
    this._element.querySelector(".element__name-mesto").textContent =
      this._data.name;
    this._elementImg.src = this._data.link;
    return this._element;
  }

  likeClick() {
    return this._likeClick;
  }

  onDelete = () => {
    this._element.remove();
    this._element = null;
  };

  getLikeCount(data) {
    this._likes = data.likes;
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this.likeClick(this);
      });
    // слушатель клика удаления
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
        console.log(this);
      });
    // слушатель клика по фото для открытия попапа фото
    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
