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
  popupDelete,
  popupProfile,
  popupMesto,
  popupFoto,
  inputName,
  inputJob,
  userAvatar,
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
import { PopupWithSubmit } from "../scripts/PopupWithSubmit.js";

// Запрос API =========================================================
let userId = null;
const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

// + Запрос к Api =============================================================================
const api = new Api(configApi);

// + Отрисовка элементов на странице ==========================================================
const dataCard = new Section(
  {
    // отвечает за создание и отрисовку данных на странице
    renderer: (item) => {
      dataCard.addItem(createCard(item));
    },
  },
  containerSelector
);

// Получение данных пользователя c сервера и вывод на страницу =====================
let dataUserServer = null;

api
  .getDataUser()
  .then((data) => {
    userId = data._id;

    dataUserServer = {
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    };
    dataUserInfo.setUserInfo(dataUserServer);
    dataUserInfo.setUserAvatar(dataUserServer);
    dataUserInfo.updateUserInfo();
    dataUserInfo.updateUserAvatar();
  })
  .catch((error) => {
    console.log(`Ошибка получения данных о пользователе ${error}`);
  });

// + обработка попапа фото ==============================================
// используется при создании карточки в колбэк - клика на карточку
const launchPopupImg = new PopupWithImage(popupFoto);
launchPopupImg.setEventListeners();

// + Функция создания карточки ================================================================
function createCard(item) {
  const card = new Card(
    item,
    templateSelector,
    function handleCardClick() {
      launchPopupImg.open(item);
    },
    function handleDeleteCard() {
      console.log(item);
      popupFormDelete.open();

      deleteCard(item);
    },
    function handleClickLike(instCard) {
      likeClick(instCard, count);
    }
  );

  return card.generateCard(userId);
}

// + Первоначальный вывод карточек из массива Api с сервера ====================================

api
  .getInitialCards()
  .then((res) => {
    dataCard.renderItems(res);
    console.log(res);
  })
  .catch((error) => {
    console.log(`Ошибка получения данных карточки ${error}`);
  });

// Обработка данных через класс UserInfo ===========================================
const dataUserInfo = new UserInfo(userName, userJob, userAvatar);

// Добавление новых карточек ==========================================
const popupFormMesto = new PopupWithForm(popupMesto, {
  submit: (userCard) => {
    const userCardData = userCard;
    api
      .setCardUser(userCardData)
      .then((userCard) => {
        dataCard.addItem(createCard(userCard), false);
      })
      .catch((error) => {
        console.log(`Ошибка получения данных карточки ${error}`);
      });

    popupFormMesto.close();
  },
});

// Удаление карточек пользователя ==================================================
const popupFormDelete = new PopupWithSubmit(popupDelete);
popupFormDelete.setEventListeners();

// Функция удаления карточек ========================================================
function deleteCard(instCard) {
  console.log(instCard);
  popupFormDelete.changeFunction(() => {
    api
      .deleteCardUser(instCard._id)
      .then(() => {
        console.log(instCard._id);
        instCard.onDelete();
      })
      .catch((error) => {
        console.log(`Ошибка удаления карточки ${error}`);
      });
  });
  popupFormDelete.open();
}
/*
// Функция проверки лайков и их удаление или установки =============================
function handleClickLike(instCard) {
  api.getLikeCardId(
    instCard.idCard,
    instCard
      .likeClick()
      .then((data) => {
        instCard.setLike(data);
      })
      .catch((error) => {
        console.log(`Ошибка данных лайков ${error}`);
      })
  );
}
*/
// Исправление(смена) данных пользователя ========================================
const popupFormProfile = new PopupWithForm(popupProfile, {
  submit: (newData) => {
    api
      .changeDataUser(newData)
      .then(() => {
        dataUserInfo.setUserInfo(newData);
        dataUserInfo.updateUserInfo();
        popupFormProfile.close();
      })
      .catch((error) => console.log(error));
    //.finally(() => popupFormProfile.)
  },
});

// Исправление(смена) аватар ===========================================
const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submit: (newData) => {
    api.changeAvatarUser(newData).then(() => {});
    dataUserInfo.setUserAvatar(newData);
    dataUserInfo.updateUserAvatar();
    popupFormAvatar.close();
  },
});

// Вызов открытия попапа Удаления ======================================

// Вызов открытия попапа Профиля ======================================
btnOpenProfile.addEventListener("click", () => {
  validProfile.resetInputError();
  const dataUser = dataUserInfo.getUserInfo();
  inputJob.value = dataUser.about;
  inputName.value = dataUser.name;
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
