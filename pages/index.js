import { Api } from "../scripts/Api.js";
import { Card } from "../scripts/Card.js";
import { FormValidate } from "../scripts/FormValidator.js";
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
let userId = null;

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

// Удаление карточек пользователя ==================================================
const popupFormDelete = new PopupWithSubmit(popupDelete);
popupFormDelete.setEventListeners();

// + Функция создания карточки ================================================================
function createCard(item) {
  const card = new Card(
    item,
    templateSelector,
    function handleCardClick() {
      launchPopupImg.open(item);
    },

    function handleDeleteCard() {
      popupFormDelete.open();
      popupFormDelete.changeFunction(() => {
        api
          .deleteCardUser(item._id)
          .then(() => {
            card.onDelete();
          })
          .catch((error) => {
            console.log(`Ошибка удаления карточки ${error}`);
          });
      });
      popupFormDelete.open();
    },

    function handleClickLike() {
      api
        .getLikeCardId(item._id, card.checkLike(userId))
        .then((data) => {
          card.calcLike(data);
        })
        .catch((error) => {
          console.log(`Ошибка данных лайков ${error}`);
        });
    }
  );

  return card.generateCard(userId);
}

// + Первоначальный вывод карточек из массива Api с сервера ====================================

api
  .getInitialCards()
  .then((res) => {
    dataCard.renderItems(res);
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
    popupFormMesto.changeTextButton(true);
    api
      .setCardUser(userCardData)
      .then((userCard) => {
        dataCard.addItem(createCard(userCard), false);
      })
      .catch((error) => {
        console.log(`Ошибка получения данных карточки ${error}`);
      })
      .finally(() => popupFormMesto.changeTextButton(false));

    popupFormMesto.close();
  },
});

// Исправление(смена) данных пользователя ========================================
const popupFormProfile = new PopupWithForm(popupProfile, {
  submit: (newData) => {
    popupFormProfile.changeTextButton(true);
    api
      .changeDataUser(newData)
      .then(() => {
        dataUserInfo.setUserInfo(newData);
        dataUserInfo.updateUserInfo();
        popupFormProfile.close();
      })
      .catch((error) => console.log(`Ошибка данных ${error}`))
      .finally(() => popupFormProfile.changeTextButton(false));
  },
});

// Исправление(смена) аватар ===========================================
const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submit: (newData) => {
    popupFormAvatar.changeTextButton(true);
    api
      .changeAvatarUser(newData)
      .then(() => {
        dataUserInfo.setUserAvatar(newData);
        dataUserInfo.updateUserAvatar();
        popupFormAvatar.close();
      })
      .catch((error) => console.log(`Ошибка данных ${error}`))
      .finally(() => popupFormAvatar.changeTextButton(false));
  },
});

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
