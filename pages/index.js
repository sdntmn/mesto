import { Api } from "../scripts/Api.js";
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
  token,
} from "../utils/constants";

// Запрос API =========================================================

const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

// Запрос к Api ======================================================
const api = new Api(configApi);

// Первоначальный вывод карточек из массива Api ==========================
api.getInitialCards().then((res) => {
  const serverCard = new Section(
    {
      res,
      // отвечает за создание и отрисовку данных на странице
      renderer: (item) => {
        serverCard.addItem(createCard(item));
      },
    },
    containerSelector
  );
  serverCard.renderItems();
});

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

/*
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
*/
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

// в работе ============================= нужно 2 обраб. данных

//api.getDataUser().then((data) => {
//  console.log(data);
//});

// Изменения для User =================================================
const popupFormProfile = new UserInfo(userName, userJob);


const openPopupProfile = new PopupWithForm(popupProfile, api, {
  api.getDataUser().then((data) => {
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

//openPopupProfile.setEventListeners(validProfile.enableValidation());
popupForm.setEventListeners(validMesto.enableValidation());
