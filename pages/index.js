import { Card } from "../scripts/Card.js";
import { FormValidate } from "../scripts/FormValidator.js";
import { initialCards } from "../utils/constants";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import "./index.css";
import {
  btnOpenProfile,
  btnOpenMesto,
  btnSaveMesto,
  popupProfile,
  popupMesto,
  popupFoto,
  inputName,
  inputJob,
  userJob,
  userName,
  containerSelector,
  config,
  templateSelector,
  formMesto,
  formProfile,
} from "../utils/constants";

// обработка попапа фото ==============================================
// используется при создании карточки в колбэк - клика на карточку
const launchPopupImg = new PopupWithImage(popupFoto);
launchPopupImg.setEventListeners();

// создание карточки ==================================================
const createCard = (item) => {
  const card = new Card(item, templateSelector, function handleCardClick() {
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
  validMesto.resetInputError();
  validMesto.disableButtonElement();
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
  validProfile.resetInputError();
  const userData = popupFormProfile.getUserInfo();
  inputJob.value = userData.userJob;
  inputName.value = userData.userName;

  openPopupProfile.open();
});

// Валидация форм =====================================================
const validMesto = new FormValidate(config, formMesto);
const validProfile = new FormValidate(config, formProfile);

// Вызов валидации ====================================================

openPopupProfile.setEventListeners(validProfile.enableValidation());
popupForm.setEventListeners(validMesto.enableValidation());
