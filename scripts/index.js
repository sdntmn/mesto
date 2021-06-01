import { Card } from "./card.js";
import {
  hideInputError,
  showInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
} from "./formValidator.js";

const initialCards = [
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
];

const formElement = document.querySelector(".profile");

const openPopupBtnProfile = formElement.querySelector(".profile__opened");
const openPopupBtnMesto = formElement.querySelector(".profile__button");

const popupProfile = document.querySelector("#popup_form_profile");
const popupMesto = document.querySelector("#popup_form_mesto");

const saveBtnMesto = popupMesto.querySelector(".popup__button");

const inputMesto = popupMesto.querySelector(".popup__input_value_mesto");
const inputLink = popupMesto.querySelector(".popup__input_value_link");

const nameInput = popupProfile.querySelector(".popup__input_value_name");
const jobInput = popupProfile.querySelector(".popup__input_value_job");
const newJob = formElement.querySelector(".profile__specialization");
const newName = formElement.querySelector(".profile__item-info");

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
});

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  document.querySelector(".elements").prepend(cardElement);
});

/* Добавление новых карточек */
saveBtnMesto.addEventListener("click", function (evt) {
  evt.preventDefault();
  const data = {
    name: inputMesto.value,
    link: inputLink.value,
  };
  const card = new Card(data);
  const cardElement = card.generateCard();

  document.querySelector(".elements").prepend(cardElement);

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
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
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
