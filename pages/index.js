import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidate } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
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

// Запрос API =========================================================
const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

// + Запрос к Api ============================================================
const api = new Api(configApi);

// Получение данных пользователя и карточек c сервера и вывод на страницу ====
let userId = null;
let cardList;

api.renderFirstData().then(([dataUser, dataCard]) => {
  userId = dataUser._id;
  cardList = new Section(
    {
      renderer: (item) => {
        cardList.addItem(createCard(item));
      },
    },
    containerSelector
  );
  cardList.renderItems(dataCard);
  userInfo.setUserInfo(dataUser);
  userInfo.setUserAvatar(dataUser);
});

// Обработка данных через класс UserInfo =====================================
const userInfo = new UserInfo(userName, userJob, userAvatar);

// + обработка попапа фото ===================================================
// используется при создании карточки в колбэк - клика на карточку
const popupImage = new PopupWithImage(popupFoto);
popupImage.setEventListeners();

// Удаление карточек пользователя ============================================
const popupFormDelete = new PopupWithSubmit(popupDelete);
popupFormDelete.setEventListeners();

// + Функция создания карточки ===============================================
function createCard(item) {
  const card = new Card(
    item,
    templateSelector,
    function handleCardClick() {
      popupImage.open(item);
    },

    function handleDeleteCard() {
      popupFormDelete.open();
      popupFormDelete.changeFunction(() => {
        api
          .deleteCardUser(item._id)
          .then(() => {
            card.onDelete();
            popupFormDelete.close();
          })
          .catch((error) => {
            console.log(`Ошибка удаления карточки ${error}`);
          });
      });
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

// Добавление новых карточек =================================================
const popupAddCard = new PopupWithForm(popupMesto, {
  submit: (userCard) => {
    const userCardData = userCard;
    popupAddCard.renderLoading(true);
    api
      .setCardUser(userCardData)
      .then((userCard) => {
        cardList.addItem(createCard(userCard), false);
        popupAddCard.close();
      })
      .catch((error) => {
        console.log(`Ошибка получения данных карточки ${error}`);
      })
      .finally(() => popupAddCard.renderLoading(false));
  },
});

// Исправление(смена) данных пользователя ====================================
const popupFormProfile = new PopupWithForm(popupProfile, {
  submit: (newData) => {
    popupFormProfile.renderLoading(true);
    api
      .changeDataUser(newData)
      .then((newData) => {
        console.log(newData);

        userInfo.setUserInfo(newData);
        popupFormProfile.close();
      })
      .catch((error) => console.log(`Ошибка данных ${error}`))
      .finally(() => popupFormProfile.renderLoading(false));
  },
});

// Change аватар =============================================================

const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submit: (newData) => {
    popupFormAvatar.renderLoading(true);
    api
      .changeAvatarUser(newData)
      .then((newData) => {
        userInfo.setUserAvatar(newData);
        popupFormAvatar.close();
      })
      .catch((error) => console.log(`Ошибка данных ${error}`))
      .finally(() => popupFormAvatar.renderLoading(false));
  },
});

// Вызов открытия попапа Профиля =============================================
btnOpenProfile.addEventListener("click", () => {
  validProfile.resetInputError();
  const dataUser = userInfo.getUserInfo();
  inputJob.value = dataUser.about;
  inputName.value = dataUser.name;
  popupFormProfile.open();
});

// Вызов открытия попапа редактирование Аватар ===============================
btnOpenAvatar.addEventListener("click", () => {
  validAvatar.resetInputError();
  validAvatar.disableButtonElement();
  popupFormAvatar.open();
});

// Вызов открытия попапа Место ===============================================
btnOpenMesto.addEventListener("click", () => {
  validMesto.resetInputError();
  validMesto.disableButtonElement();
  popupAddCard.open();
});

// Валидация форм ============================================================
const validMesto = new FormValidate(config, formMesto);
const validProfile = new FormValidate(config, formProfile);
const validAvatar = new FormValidate(config, formAvatar);

// Вызов валидации ===========================================================
popupFormAvatar.setEventListeners(validAvatar.enableValidation());
popupFormProfile.setEventListeners(validProfile.enableValidation());
popupAddCard.setEventListeners(validMesto.enableValidation());
