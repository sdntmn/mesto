let formElement = document.querySelector(".profile");

const openPopupBtnProfile = formElement.querySelector(".profile__opened");
const openPopupBtnMesto = formElement.querySelector(".profile__button");

const popupProfile = document.querySelector("#popup_form_profile");
const popupMesto = document.querySelector("#popup_form_mesto");
const popupFoto = document.querySelector("#popup_foto_mesto");

const closePopupBtnProfile = popupProfile.querySelector(".popup__close");
const closePopupBtnMesto = popupMesto.querySelector(".popup__close");
const closePopupBtnFoto = popupFoto.querySelector(".popup__close");
const saveBtnProfile = popupProfile.querySelector(".popup__button");
const saveBtnMesto = popupMesto.querySelector(".popup__button");
const popupImg = document.querySelector(".popup__img");
const popupImgName = document.querySelector(".popup__img-name");

const listMesto = document.querySelector(".elements");
const inputMesto = popupMesto.querySelector(".popup__input_value_mesto");
const inputLink = popupMesto.querySelector(".popup__input_value_link");

let nameInput = popupProfile.querySelector(".popup__input_value_name");
let jobInput = popupProfile.querySelector(".popup__input_value_job");
let newJob = formElement.querySelector(".profile__specialization");
let newName = formElement.querySelector(".profile__item-info");

const elementTemplate = document.querySelector("#template-element");

/* Работа с карточками */
function createCard(linkFoto, nameMesto) {
  const cardElement = elementTemplate.content.cloneNode(true);
  const elementTrash = cardElement.querySelector(".element__trash");
  const elementLike = cardElement.querySelector(".element__like");
  const elementImg = cardElement.querySelector(".element__img");
  const elementNameMesto = cardElement.querySelector(".element__name-mesto");

  elementImg.src = linkFoto;
  elementImg.alt = `Фото. ${nameMesto}`;
  elementNameMesto.textContent = nameMesto;
  /* Удаление карточек */
  elementTrash.addEventListener("click", function (evt) {
    evt.target.closest(".element").remove();
  });

  /* Поставить лайк карточке */
  elementLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });

  /* Попап фото*/
  elementImg.addEventListener("click", function () {
    openPopup(popupFoto);
    popupImg.src = elementImg.src;
    popupImgName.textContent = elementNameMesto.textContent;
  });

  return cardElement;
}

/* Первоначальный вывод карточек из массива*/
initialCards.forEach(function (element) {
  const newCard = createCard(element.link, element.name);

  listMesto.prepend(newCard);
});

/* Добавление новых карточек */
saveBtnMesto.addEventListener("click", function (evt) {
  evt.preventDefault();
  const cardValue = createCard(inputLink.value, inputMesto.value);
  listMesto.prepend(cardValue);
  closePopup(popupMesto);
});

/* Функция открытия попапов */
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

/* Открытие popupProfile */
openPopupBtnProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
});

/* Открытие popupInputMesto */
openPopupBtnMesto.addEventListener("click", function () {
  openPopup(popupMesto);
  inputMesto.value = "";
  inputLink.value = "";
});

/* Функция закрытия попапов */
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

/* Закрытие popupProfile */
closePopupBtnProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

/* Закрытие popupInputMesto */
closePopupBtnMesto.addEventListener("click", function () {
  closePopup(popupMesto);
});

/* Закрытие попап FotoMesto*/
closePopupBtnFoto.addEventListener("click", function () {
  closePopup(popupFoto);
});

/* Ввод данных и закрытие popupProfile по кнопке сохранить */
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupProfile);
}
popupProfile.addEventListener("submit", formSubmitHandlerProfile);

/* Закрытие popupProfile по полю в не окна попап */
function handleOverlayClickProfile(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupProfile);
  }
}
popupProfile.addEventListener("click", handleOverlayClickProfile);

/* Закрытие popupMesto по полю в не окна попап */
function handleOverlayClickMesto(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupMesto);
  }
}
popupMesto.addEventListener("click", handleOverlayClickMesto);
