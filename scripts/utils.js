import { initialCards, cardsContainer } from "./index.js";
import Card from "./Card.js";

export function handleCloseBtnPopup() {
  const closeBtn = Array.from(popup.querySelectorAll(".popup__close"));
  const popupContainer = Array.from(popup.querySelectorAll(".popup"));

  const closePopup = () => {
    popup.querySelector(".popup_images").classList.remove("popup_opened");
    popup.querySelector(".popup_edit").classList.remove("popup_opened");
    popup.querySelector(".popup_add").classList.remove("popup_opened");

    popup.querySelector(".popup__input_title").value = "";
    popup.querySelector(".popup__input_url").value = "";
  };

  closeBtn.forEach((item) => item.addEventListener("click", closePopup));

  popupContainer.forEach((item) => {
    item.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup();
      }
    });
  });

  document.addEventListener("keyup", (evt) => {
    if (evt.key === "Escape") closePopup();
  });
}

export default (function () {
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
    popupEditSubmit.disabled = true
    popupEdit.classList.add("popup_opened");

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
    hasError();
    handleCloseBtnPopup();
  });

  popupAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();

    initialCards.push({ name: inputTitle.value, link: inputUrl.value });
    //   handleCardAdd(inputTitle.value, inputUrl.value);

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
})();
