export {
  blockProfile,
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
};
const blockProfile = document.querySelector(".profile");
const popupMesto = document.querySelector("#popup_form_mesto");
const popupFoto = document.querySelector("#popup_foto_mesto");
const btnOpenProfile = blockProfile.querySelector(".profile__opened");
const btnOpenMesto = blockProfile.querySelector(".profile__button");
const popupProfile = document.querySelector("#popup_form_profile");

const inputName = popupProfile.querySelector(".popup__input_value_name");
const inputJob = popupProfile.querySelector(".popup__input_value_job");
const userJob = blockProfile.querySelector(".profile__specialization");
const userName = blockProfile.querySelector(".profile__item-info");
const formMesto = "#form_mesto";
const formProfile = "#form_profile";
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