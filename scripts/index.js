const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let formElement = document.querySelector(".profile");

const openPopupBtnProfile = formElement.querySelector(".profile__opened");
const openPopupBtnMesto = formElement.querySelector(".profile__button");
const popupProfile = document.querySelector("#popup_form_profile");
const popupMesto = document.querySelector("#popup_form_mesto");
const closePopupBtnProfile = popupProfile.querySelector(".popup__close");
const closePopupBtnMesto = popupMesto.querySelector(".popup__close");

let nameInput = popupProfile.querySelector(".popup__input_value_name");
let jobInput = popupProfile.querySelector(".popup__input_value_job");
let newJob = formElement.querySelector(".profile__specialization");
let newName = formElement.querySelector(".profile__item-info");

/* Ввод данных карточек и работа с темплейт  */

/* Открытие popupProfile */
function openPopupProfile() {
  popupProfile.classList.toggle("popup_is-opened");
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
}
openPopupBtnProfile.addEventListener("click", openPopupProfile);

/* Открытие popupMesto */
function openPopupMesto() {
  popupMesto.classList.toggle("popup_is-opened");
}
openPopupBtnMesto.addEventListener("click", openPopupMesto);

/* Закрытие popupProfile */
function closePopupProfile() {
  popupProfile.classList.toggle("popup_is-opened");
}
closePopupBtnProfile.addEventListener("click", closePopupProfile);

/* Закрытие popupMesto */
function closePopupMesto() {
  popupMesto.classList.toggle("popup_is-opened");
}
closePopupBtnMesto.addEventListener("click", closePopupMesto);

/* Закрытие popupProfile по полю в не окна попап */
function handleOverlayClickProfile(event) {
  if (event.target === event.currentTarget) {
    closePopupProfile(event);
  }
}
popupProfile.addEventListener("click", handleOverlayClickProfile);

/* Закрытие popupMesto по полю в не окна попап */
function handleOverlayClickMesto(event) {
  if (event.target === event.currentTarget) {
    closePopupMesto(event);
  }
}
popupMesto.addEventListener("click", handleOverlayClickMesto);

/* Ввод данных и закрытие popupProfile по кнопке сохранить */
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopupProfile(evt);
}
popupProfile.addEventListener("submit", formSubmitHandlerProfile);

/* Добавление карточек и закрытие popupMesto по кнопке создать*/
const elementTemplate = document.querySelector("#template-element").content;
const inputMesto = popupMesto.querySelector(".popup__input_value_mesto");
const inputLink = popupMesto.querySelector(".popup__input_value_link");
const listMesto = document.querySelector(".elements");

initialCards.forEach(function (element) {
  const cardElement = elementTemplate.cloneNode(true);
  const img = cardElement.querySelector(".element__img");
  const name = cardElement.querySelector(".element__name-mesto");
  img.src = element.link;
  console.log(img.src);
  name.textContent = element.name;
  console.log(name.textContent);
  listMesto.append(cardElement);
});
