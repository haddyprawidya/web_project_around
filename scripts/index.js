import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {handleCloseBtnPopup} from "./utils.js";

export const initialCards = [
  {
    name: "Cityscape during Nighttime",
    link: "https://images.pexels.com/photos/40142/new-york-skyline-manhattan-hudson-40142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Statue of Liberty",
    link: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Bridge",
    link: "https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Fabulous Las Vegas",
    link: "https://images.pexels.com/photos/415999/pexels-photo-415999.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Rock Formation",
    link: "https://images.pexels.com/photos/844167/pexels-photo-844167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Central Park",
    link: "https://images.pexels.com/photos/11249961/pexels-photo-11249961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

(function () {
  const profile = document.querySelector(".profile");
  const profilName = profile.querySelector(".profile__name");
  const profilAbout = profile.querySelector(".profile__about");

  const editBtn = profile.querySelector(".profile__edit-button");
  const addBtn = profile.querySelector(".profile__add-button");

  const popup = document.querySelector("#popup");
  const popupEdit = popup.querySelector(".popup_edit");
  const inputName = popupEdit.querySelector(".popup__input_name");
  const inputDescription = popupEdit.querySelector(".popup__input_about");

  const popupAdd = popup.querySelector(".popup_add");
  const inputTitle = popupAdd.querySelector(".popup__input_title");
  const inputUrl = popupAdd.querySelector(".popup__input_url");

  const cardsContainer = document.querySelector(".cards")

  function hasError() {
    const errorMessage = Array.from(
      popup.querySelectorAll(".popup__input-error_active")
    );
    const errorLine = Array.from(popup.querySelectorAll(".popup__input_error"));

    errorMessage.forEach((hasClass) =>
      hasClass.classList.remove("popup__input-error_active")
    );
    errorLine.forEach((hasClass) =>
      hasClass.classList.remove("popup__input_error")
    );
  }

  editBtn.addEventListener("click", () => {
    const popupEditSubmit = popupEdit.querySelector(".popup__submit");
    popupEditSubmit.classList.add("popup__submit_disabled");
    popupEditSubmit.disabled = true;
    popupEdit.classList.add("popup_opened");

    new FormValidator(".popup_edit").enableValidation();

    hasError();
    handleCloseBtnPopup();
    inputName.value = profilName.textContent;
    inputDescription.value = profilAbout.textContent;
  });

  popupEdit.addEventListener("submit", (evt) => {
    evt.preventDefault();

    profilName.textContent = inputName.value;
    profilAbout.textContent = inputDescription.value;
    popupEdit.classList.remove("popup_opened");
  });

  addBtn.addEventListener("click", () => {
    const popupAddSubmit = popupAdd.querySelector(".popup__submit");
    popupAddSubmit.classList.add("popup__submit_disabled");
    popupAddSubmit.disabled = true;
    popupAdd.classList.add("popup_opened");

    new FormValidator(".popup_add").enableValidation();

    hasError();
    handleCloseBtnPopup();
  });

  popupAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();

    initialCards.push({ name: inputTitle.value, link: inputUrl.value });

    const card = new Card(
      { name: inputTitle.value, link: inputUrl.value },
      "#template__cards"
    );
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);

    inputTitle.value = "";
    inputUrl.value = "";

    popupAdd.classList.remove("popup_opened");
  });

  initialCards.forEach((item) => {
    const card = new Card(item, "#template__cards");
    const cardElement = card.generateCard();
  
    cardsContainer.prepend(cardElement);
  });
})();