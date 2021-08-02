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
    this._likesArr = data.likes;
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
    this._element.querySelector(".element__number-likes").textContent =
      this._likesArr.length;
    if (userId === this.idCard) {
      this._elementDel = this._elementDel.classList.add("element_is-visible");
    }
    if (this._likesArr.find((item) => userId === item._id)) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    }
    this._listenerLike();
    this._setEventListeners();
    this._elementImg.alt = `Фото. ${this._data.name}`;
    this._element.querySelector(".element__name-mesto").textContent =
      this._data.name;
    this._elementImg.src = this._data.link;
    return this._element;
  }

  checkLike(userId) {
    return Boolean(
      this._likesArr.find((item) => {
        return userId === item._id;
      })
    );
  }

  _likeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  calcLike(data) {
    this._likesArr = data.likes;
    this._element.querySelector(".element__number-likes").textContent =
      data.likes.length;
    if (this.checkLike() === false) {
      this._likeClick();
    }
  }

  onDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _listenerLike() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleClickLike(this);
      });
  }

  _setEventListeners() {
    // слушатель клика удаления
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    // слушатель клика по фото для открытия попапа фото
    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
