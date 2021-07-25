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
  btnOpenAvatar,
  btnOpenProfile,
  btnOpenMesto,
  popupAvatar,
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
  formAvatar,
  formMesto,
  formProfile,
  token,
} from "../utils/constants";

// Запрос API =========================================================
let userId = null;
const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

// Запрос к Api ======================================================
const api = new Api(configApi);

const dataUser = api.getDataUser();
/*
function getDataUserId() {
  const dataUserid = "";
  api.getDataUser().then((data) => {
  dataUserid = data._id;
});

console.log(dataUserid);
*/
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

  return card.generateCard(userId);
};

// Изменения для User =================================================
const dataUserInfo = new UserInfo(userName, userJob);

// Получение данных пользователя сервера и вывод на страницу =====================
dataUser.then((data) => {
  userId = data._id;

  const dataUserServer = {
    name: data.name,
    about: data.about,
  };
  dataUserInfo.setUserInfo(dataUserServer);
  dataUserInfo.updateUserInfo();
});

// Добавление новых карточек ==========================================
const popupFormMesto = new PopupWithForm(popupMesto, {
  submit: (data) => {
    console.log(userId);
    defaultCardList.addItem(createCard(data));

    popupFormMesto.close();
  },
});

//====================================================================
const popupFormProfile = new PopupWithForm(popupProfile, {
  submit: (data) => {
    dataUserInfo.getUserInfo(data);

    popupFormProfile.close();
  },
});

const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submit: () => {
    popupFormAvatar.close();
  },
});

// Вызов открытия попапа Профиля ======================================
btnOpenProfile.addEventListener("click", () => {
  validProfile.resetInputError();

  popupFormProfile.open();
});

// Вызов открытия попапа редактирование Аватар ========================
btnOpenAvatar.addEventListener("click", () => {
  validAvatar.resetInputError();
  validAvatar.disableButtonElement();
  popupFormAvatar.open();
});

// Вызов открытия попапа Место ========================================
btnOpenMesto.addEventListener("click", () => {
  validMesto.resetInputError();
  validMesto.disableButtonElement();
  popupFormMesto.open();
});

// Валидация форм =====================================================
const validMesto = new FormValidate(config, formMesto);
const validProfile = new FormValidate(config, formProfile);
const validAvatar = new FormValidate(config, formAvatar);

// Вызов валидации ====================================================
popupFormAvatar.setEventListeners(validAvatar.enableValidation());
popupFormProfile.setEventListeners(validProfile.enableValidation());
popupFormMesto.setEventListeners(validMesto.enableValidation());
