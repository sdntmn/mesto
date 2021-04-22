const openPopupButton = document.querySelector(".profille__name-change");

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

let formElement = document.querySelector(".profille");
let nameInput = popup.querySelector(".popup__input_value_name");
let jobInput = popup.querySelector(".popup__input_value_job");
const savePopupButton = popup.querySelector(".popup__button");

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newJob = formElement.querySelector(".profille__specialization");
  let newName = formElement.querySelector(".profille__name");
  newJob.textContent = jobInput.value;
  newName.textContent = nameInput.value;
  savePopupButton.addEventListener("click", togglePopup);
}
popup.addEventListener("submit", formSubmitHandler);
