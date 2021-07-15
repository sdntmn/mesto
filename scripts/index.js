import { Card } from "./card.js";
import { FormValidate } from "./formValidator.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./section.js";
import { PopupWithForm } from "./popupWithForm.js";
import { UserInfo } from "./userInfo.js";
import { PopupWithImage } from "./popupWithImage.js";
import "../pages/index.css";

const blockProfile = document.querySelector(".profile");

const btnOpenProfile = blockProfile.querySelector(".profile__opened");
const btnOpenMesto = blockProfile.querySelector(".profile__button");

const popupProfile = document.querySelector("#popup_form_profile");
const popupMesto = document.querySelector("#popup_form_mesto");
const popupFoto = document.querySelector("#popup_foto_mesto");

const inputName = popupProfile.querySelector(".popup__input_value_name");
const inputJob = popupProfile.querySelector(".popup__input_value_job");
const userJob = blockProfile.querySelector(".profile__specialization");
const userName = blockProfile.querySelector(".profile__item-info");

const containerSelector = ".elements";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button:disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

// обработка попапа фото ==============================================
// используется при создании карточки в колбэк - клика на карточку
const launchPopupImg = new PopupWithImage(popupFoto);
launchPopupImg.setEventListeners();

// создание карточки ==================================================
const createCard = (item) => {
  const card = new Card(item, "#template-element", function handleCardClick() {
    launchPopupImg.open(item);
  });

  return card.generateCard();
};

// Первоначальный вывод карточек из массива  ==========================
const defaultCardList = new Section(
  {
    items: initialCards,
    // отвечает за создание и отрисовку данных на странице
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  containerSelector
);
//Вызов первоначального вывода карточек ===============================
defaultCardList.renderItems();

// Добавление новых карточек ==========================================
const popupForm = new PopupWithForm(popupMesto, {
  submit: (data) => {
    defaultCardList.addItem(createCard(data));

    popupForm.close();
  },
});

// Вызов открытия попапа Место ========================================
btnOpenMesto.addEventListener("click", () => {
  popupForm.open();
});

// Изменения для User =================================================
const popupFormProfile = new UserInfo(userName, userJob);

const openPopupProfile = new PopupWithForm(popupProfile, {
  submit: (data) => {
    popupFormProfile.setUserInfo(data);

    openPopupProfile.close();
  },
});

// Вызов открытия попапа Профиля ======================================
btnOpenProfile.addEventListener("click", () => {
  const userData = popupFormProfile.getUserInfo();
  inputJob.value = userData.userJob;
  inputName.value = userData.userName;

  openPopupProfile.open();
});

// Валидация форм =====================================================
const validMesto = new FormValidate(config, "#form_mesto");
const validProfile = new FormValidate(config, "#form_profile");

// Вызов валидации ====================================================

openPopupProfile.setEventListeners(validProfile.enableValidation());
popupForm.setEventListeners(validMesto.enableValidation());
