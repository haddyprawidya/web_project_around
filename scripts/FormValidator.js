export default class FormValidator {
  constructor(formSelector) {
    this._formElement = document.querySelector(formSelector);
  }

  enableValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    const buttonElement = this._formElement.querySelector(".popup__submit");

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input_error");
    errorElement.classList.add("popup__input-error_active");
    errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvaildInput(inputList)) {
      buttonElement.classList.add("popup__submit_disabled");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove("popup__submit_disabled");
      buttonElement.disabled = false;
    }
  }

  _hasInvaildInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
}
