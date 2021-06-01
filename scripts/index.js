const formElement = document.querySelector(".profile");

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

const nameInput = popupProfile.querySelector(".popup__input_value_name");
const jobInput = popupProfile.querySelector(".popup__input_value_job");
const newJob = formElement.querySelector(".profile__specialization");
const newName = formElement.querySelector(".profile__item-info");

const elementTemplate = document.querySelector("#template-element");

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
});

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
    popupImg.alt = elementImg.alt;
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

  saveBtnMesto.disabled = true;
  listMesto.prepend(cardValue);
  closePopup(popupMesto);
});

/* Функция открытия попапов */
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape); // навесили слушателя
}

/* Открытие popupProfile */
openPopupBtnProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
});

/* Открытие popupInputMesto */
const form = document.forms.formMesto;
openPopupBtnMesto.addEventListener("click", function () {
  form.reset();
  openPopup(popupMesto);
});

/* Функция закрытия попапов */
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape); // удалили слушателя
}

/* Ввод данных и закрытие popupProfile по кнопке сохранить */
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupProfile);
}
popupProfile.addEventListener("submit", formSubmitHandlerProfile);

/* Слушатель закрытия popups кликом мыши по полю и по кнопке закрытия popup  */
const listenersClosePopups = Array.from(document.querySelectorAll(".popup"));
listenersClosePopups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

/* Функция закрытия по кнопке Esc*/
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
