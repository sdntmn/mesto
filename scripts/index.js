let formElement = document.querySelector(".profile");

const openPopupButton = formElement.querySelector(".profile__opened");
const popup = document.querySelector(".popup");
const closePopupButton = popup.querySelector(".popup__close");

let nameInput = popup.querySelector(".popup__input_value_name");
let jobInput = popup.querySelector(".popup__input_value_job");
let newJob = formElement.querySelector(".profile__specialization");
let newName = formElement.querySelector(".profile__item-info");

function openPopup() {
  popup.classList.toggle("popup_opened");
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
}
openPopupButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.toggle("popup_opened");
}
closePopupButton.addEventListener("click", closePopup);

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
}
popup.addEventListener("click", handleOverlayClick);

function formSubmitHandler(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(evt);
}
popup.addEventListener("submit", formSubmitHandler);
