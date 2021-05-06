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

/*Переделать */
/* Открытие popupProfile */
openPopupBtnProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
});
