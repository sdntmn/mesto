let formElement = document.querySelector(".profile");

const openPopupBtnProfile = formElement.querySelector(".profile__opened");
const openPopupBtnMesto = formElement.querySelector(".profile__button");

const popupProfile = document.querySelector("#popup_form_profile");
const popupMesto = document.querySelector("#popup_form_mesto");
const popupFoto = document.querySelector("#popup_foto_mesto");

const closePopupBtnProfile = popupProfile.querySelector(".popup__close");
const closePopupBtnMesto = popupMesto.querySelector(".popup__close");
const closePopupBtnFoto = popupFoto.querySelector(".popup__close");
const saveBtnMesto = popupMesto.querySelector(".popup__button");
const popupImg = document.querySelector(".popup__img");
const popupImgName = document.querySelector(".popup__img-name");

const listMesto = document.querySelector(".elements");
const inputMesto = popupMesto.querySelector(".popup__input_value_mesto");
const inputLink = popupMesto.querySelector(".popup__input_value_link");

let nameInput = popupProfile.querySelector(".popup__input_value_name");
let jobInput = popupProfile.querySelector(".popup__input_value_job");
let newJob = formElement.querySelector(".profile__specialization");
let newName = formElement.querySelector(".profile__item-info");

const elementTemplate = document.querySelector("#template-element");

/* Работа с карточками */
function createCard(linkFoto, nameMesto) {
  const cardElement = elementTemplate.content.cloneNode(true);
  const elementTrash = cardElement.querySelector(".element__trash");
  const elementLike = cardElement.querySelector(".element__like");
  const elementImg = cardElement.querySelector(".element__img");
  const elementNameMesto = cardElement.querySelector(".element__name-mesto");

  elementImg.src = linkFoto;
  elementImg.alt = `Фото. ${nameMesto}`;
  elementNameMesto.textContent = nameMesto;
  /* Удаление карточек */
  elementTrash.addEventListener("click", function (e) {
    e.target.closest(".element").remove();
  });

  /* Поставить лайк карточке */
  elementLike.addEventListener("click", function (e) {
    e.target.classList.toggle("element__like_active");
  });

  /* Попап фото*/
  elementImg.addEventListener("click", function () {
    popupFoto.classList.toggle("popup_is-opened");
    popupImg.src = elementImg.src;
    popupImgName.textContent = elementNameMesto.textContent;
  });

  return cardElement;
}

/* Первоначальный вывод карточек из массива*/
initialCards.forEach(function (element) {
  const newCard = createCard(element.link, element.name);

  listMesto.prepend(newCard);
});

/* Добавление новых карточек */
saveBtnMesto.addEventListener("click", function (e) {
  e.preventDefault();
  const cardValue = createCard(inputLink.value, inputMesto.value);
  listMesto.prepend(cardValue);
  closePopupMesto(e);
});

/* Открытие popupProfile */
function openPopupProfile() {
  popupProfile.classList.toggle("popup_is-opened");
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
}
openPopupBtnProfile.addEventListener("click", openPopupProfile);

/* Открытие popupInputMesto */
function openPopupMesto() {
  popupMesto.classList.toggle("popup_is-opened");
}
openPopupBtnMesto.addEventListener("click", openPopupMesto);

/* Закрытие popupProfile */
function closePopupProfile() {
  popupProfile.classList.toggle("popup_is-opened");
}
closePopupBtnProfile.addEventListener("click", closePopupProfile);

/* Закрытие popupInputMesto */

function closePopupMesto() {
  popupMesto.classList.toggle("popup_is-opened");
}
closePopupBtnMesto.addEventListener("click", closePopupMesto);

/* Закрытие попап FotoMesto*/
function closePopupFotoMesto() {
  popupFoto.classList.toggle("popup_is-opened");
}
closePopupBtnFoto.addEventListener("click", closePopupFotoMesto);

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
