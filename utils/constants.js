export {
  blockProfile,
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
};
const token = "6be9abb7-ced4-4a7c-8643-2f58993788b8";

const blockProfile = document.querySelector(".profile");
const popupMesto = document.querySelector("#popup_form_mesto");
const popupFoto = document.querySelector("#popup_foto_mesto");
const popupAvatar = document.querySelector("#popup_form_avatar");
const btnOpenProfile = blockProfile.querySelector(".profile__opened");
const btnOpenMesto = blockProfile.querySelector(".profile__button");
const btnOpenAvatar = blockProfile.querySelector(".profile__opened-avatar");
const popupProfile = document.querySelector("#popup_form_profile");

const inputName = popupProfile.querySelector(".popup__input_value_name");
const inputJob = popupProfile.querySelector(".popup__input_value_job");
const userJob = blockProfile.querySelector(".profile__specialization");
const userName = blockProfile.querySelector(".profile__item-info");
const formMesto = "#form_mesto";
const formProfile = "#form_profile";
const formAvatar = "#form_avatar";
const containerSelector = ".elements";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button:disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const templateSelector = "#template-element";

export const initialCards = [
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
