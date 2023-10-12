function enableValidation(validationObject) {
  const formList = Array.from(
    document.querySelectorAll(validationObject.formSelector)
  );

  const showInputError = function (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.classList.add(validationObject.errorClass);
    errorElement.textContent = errorMessage;
  };

  const hideInputError = function (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = "";
  };

  const checkInputValidity = function (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const hasInvaildInput = function (inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  const toggleButtonState = function (inputList, buttonElement) {
    if (hasInvaildInput(inputList)) {
      buttonElement.classList.add(validationObject.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(validationObject.inactiveButtonClass);
    }
  };

  const setEventListener = function (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationObject.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationObject.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListener(formElement);
  });
}

enableValidation({
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
});
