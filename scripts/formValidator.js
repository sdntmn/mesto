export class FormValidate {
  constructor(config, formSelector) {
    this._formSelector = document.querySelector(formSelector);
    this._inputSelector = config.inputSelector;
    this._button = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError() {
    const errorMessage = this._formSelector.querySelector(
      `.${this.input.id}-error`
    );
    this.input.classList.add(this._inputErrorClass);
    errorMessage.textContent = this.input.validationMessage;
    this.input.classList.add(this._errorClass);
  }

  _hideInputError = () => {
    const errorMessage = this._formSelector.querySelector(
      `.${this.input.id}-error`
    );
    this.input.classList.remove(this._inputErrorClass);
    this.input.classList.remove(this._errorClass);
    errorMessage.textContent = "";
  };

  _checkInputValidity = (input) => {
    this.input = input;
    if (!input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  //&
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    const button = this._formSelector.querySelector(this._button);
    if (this._hasInvalidInput()) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
}
