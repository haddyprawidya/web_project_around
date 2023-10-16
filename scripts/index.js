import {enableValidation} from './validate.js';

enableValidation({
    formSelector: ".popup",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__input-error_active",
  });
