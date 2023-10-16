const initialCards = [
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

function handleCloseBtnPopup() {
  const closeBtn = Array.from(popup.querySelectorAll(".popup__close"));
  const popupContainer = Array.from(popup.querySelectorAll(".popup"));

  const closePopup = () => {
    const popupImage = popup.querySelector(".popup_images");
    popupEdit.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    popupImage.classList.remove("popup_opened");
    inputTitle.value = "";
    inputUrl.value = "";
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

function handleCardAdd(name, link) {
  const cardTemplate = document.querySelector("#template__cards").content;
  const cardsContainer = document.querySelector(".cards");
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = `Image ${name}`;
  cardElement.querySelector(".card__title").textContent = name;

  cardsContainer.prepend(cardElement);
}
function btnLikeToogle(item) {
  const btnLike = item.target.classList.contains("card__like-icon_active");
  btnLike
    ? item.target.classList.remove("card__like-icon_active")
    : item.target.classList.add("card__like-icon_active");
}

function handleBtnLikeToggle() {
  const btnLikes = Array.from(document.querySelectorAll(".card__like-icon"));
  btnLikes.forEach((item) => {
    item.addEventListener("click", btnLikeToogle);
  });
}

function handleDelCardButton() {
  const btnDel = Array.from(document.querySelectorAll(".card__delete"));
  btnDel.forEach((item) => {
    item.addEventListener("click", (del) => del.target.parentNode.remove());
  });
}

function handleCardImagePopup() {
  const cardsImage = Array.from(document.querySelectorAll(".card__image"));
  cardsImage.map((item) => {
    item.addEventListener("click", (image) => {
      const popImageContainer = document.querySelector(".popup_images");
      popImageContainer.classList.add("popup_opened");
      const popImageUrl = popImageContainer.querySelector(".popup__image");
      const popDesc = popImageContainer.querySelector(".popup__description");
      const popTitle =
        image.target.parentNode.querySelector(".card__title").textContent;

      popImageUrl.src = image.target.src;
      popDesc.textContent = popTitle;
      handleCloseBtnPopup();
    });
  });
}

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

  initialCards.unshift({ name: inputTitle.value, link: inputUrl.value });
  handleCardAdd(inputTitle.value, inputUrl.value);

  inputTitle.value = "";
  inputUrl.value = "";

  popupAdd.classList.remove("popup_opened");
  handleBtnLikeToggle();
  handleDelCardButton();
  handleCardImagePopup();
});

initialCards.forEach((item) => {
  handleCardAdd(item.name, item.link);
});

handleBtnLikeToggle();
handleDelCardButton();
handleCardImagePopup();

import {enableValidation} from './validate.js';
enableValidation({
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
});
