const openPopupButton = document.querySelector(".profile__opened");

const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

function togglePopup(event) {
  event.preventDefault();
  popup.classList.toggle("popup_opened");
}
openPopupButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
}
popup.addEventListener("click", handleOverlayClick);

let formElement = document.querySelector(".profile");
let nameInput = popup.querySelector(".popup__input_value_name");
let jobInput = popup.querySelector(".popup__input_value_job");
let newJob = formElement.querySelector(".profile__specialization");
let newName = formElement.querySelector(".profile__item-info");

function formSubmitHandler(evt) {
  evt.preventDefault();

  newJob.textContent = jobInput.value;
  newName.textContent = nameInput.value;
  togglePopup(evt);
}
popup.addEventListener("submit", formSubmitHandler);
