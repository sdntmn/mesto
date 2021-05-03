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
console.log(initialCards.length);

openPopupBtnMesto.addEventListener("click", function name(params) {
  const mestoValue = inputMesto.value;
  const mestoLinkValue = inputLink.value;
  const newMestoLinkValue = inputLink.value;
  const newMesto = elementTemplate.content
    .querySelector(".element")
    .cloneNode(true);

  const elemNameMesto = newMesto.querySelector(".element__name-mesto");
  elemNameMesto.textContent = mestoValue;
  const elemImgMesto = newMestoLinkValue.querySelector(".element__img");
  elemImgMesto.textContent = mestoLinkValue;
});
