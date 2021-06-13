import { Card } from "./card.js";
import { FormValidate } from "./formValidator.js";
import { initialCards } from "./initial-cards.js";

const keyEscape = "Escape";

const blockProfile = document.querySelector(".profile");

const btnOpenProfile = blockProfile.querySelector(".profile__opened");
const btnOpenMesto = blockProfile.querySelector(".profile__button");

const popupProfile = document.querySelector("#popup_form_profile");
const popupMesto = document.querySelector("#popup_form_mesto");

const btnSaveMesto = popupMesto.querySelector(".popup__button");

const inputMesto = popupMesto.querySelector(".popup__input_value_mesto");
const inputLink = popupMesto.querySelector(".popup__input_value_link");

const inputName = popupProfile.querySelector(".popup__input_value_name");
const inputJob = popupProfile.querySelector(".popup__input_value_job");
const newJob = blockProfile.querySelector(".profile__specialization");
const newName = blockProfile.querySelector(".profile__item-info");

const containerCard = document.querySelector(".elements");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button:disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

function createCard(item) {
  const card = new Card(item, "#template-element", openPopup);
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((cardElement) => {
  const initialCard = createCard(cardElement);
  containerCard.prepend(initialCard);
});

/* Добавление новых карточек */
const creatureFormCard = document.forms.formMesto;

creatureFormCard.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const data = {
    name: inputMesto.value,
    link: inputLink.value,
  };
  const newCard = createCard(data);

  containerCard.prepend(newCard);
  closePopup(popupMesto);
  creatureFormCard.reset();
});

/* Функция открытия попапов */
function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEscape); // навесили слушателя
}

/* Открытие popupProfile */
btnOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  inputName.value = newName.textContent;
  inputJob.value = newJob.textContent;
});

/* Открытие popupInputMesto */

btnOpenMesto.addEventListener("click", function () {
  creatureFormCard.reset();
  btnSaveMesto.disabled = true;
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
  newName.textContent = inputName.value;
  newJob.textContent = inputJob.value;
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
  if (evt.key === keyEscape) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
const validMesto = new FormValidate(config, "#form_mesto");
const validProfile = new FormValidate(config, "#form_profile");

validProfile.enableValidation();
validMesto.enableValidation();
