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
const errTitle = popupAdd.querySelector(".popup__valid-title");
const errUrl = popupAdd.querySelector(".popup__valid-url");

function handleCloseBtnPopup() {
  const closeBtn = Array.from(popup.querySelectorAll(".popup__close"));
  closeBtn.forEach((item) => {
    const popupImage = popup.querySelector(".popup_images");
    item.addEventListener("click", () => {
      popupEdit.classList.remove("popup_opened");
      popupAdd.classList.remove("popup_opened");
      popupImage.classList.remove("popup_opened");
      inputTitle.value = "";
      inputUrl.value = "";
    });
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

function handleBtnLikeToggle() {
  const btnLikes = Array.from(document.querySelectorAll(".card__like-icon"));
  btnLikes.forEach((item) => {
    item.addEventListener("click", btnLikeToogle);
  });
  function btnLikeToogle(item) {
    const btnLike = item.target.classList.contains("card__like-icon_active");
    btnLike
      ? item.target.classList.remove("card__like-icon_active")
      : item.target.classList.add("card__like-icon_active");
  }
}

function handleDelCardButton() {
  const btnDel = Array.from(document.querySelectorAll(".card__delete"));
  btnDel.forEach((item) => {
    item.addEventListener("click", (del) => del.target.parentNode.remove());
  });
}

function handleValidFormAdd() {
  if (inputTitle.value === "") {
    errTitle.classList.add("popup__valid_success");
    return false;
  }
  if (!inputUrl.value.includes("https")) {
    if (inputTitle.value !== "") {
      errTitle.classList.remove("popup__valid_success");
    }
    errUrl.classList.add("popup__valid_success");
    return false;
  }
  return true;
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

editBtn.addEventListener("click", () => {
  const editBtnSubmit = popupEdit.querySelector(".popup__submit");
  popupEdit.classList.add("popup_opened");
  handleCloseBtnPopup();

  inputName.value = profilName.textContent;
  inputDescription.value = profilAbout.textContent;
  editBtnSubmit.disabled = true;
  popupEdit.addEventListener("input", () => {
    const nameValue = inputName.value;
    const descriptionValue = inputDescription.value;
    const profileNameText = profilName.textContent;
    const profileAboutText = profilAbout.textContent;
    const isAnyInputEmpty = nameValue === "" || descriptionValue === "";
    const hasChanged =
      nameValue !== profileNameText || descriptionValue !== profileAboutText;
    editBtnSubmit.disabled = !(hasChanged && !isAnyInputEmpty);
  });
});

popupEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilAbout.textContent = inputDescription.value;
  popupEdit.classList.remove("popup_opened");
});

addBtn.addEventListener("click", () => {
  popupAdd.classList.add("popup_opened");
  errTitle.classList.remove("popup__valid_success");
  errUrl.classList.remove("popup__valid_success");
  handleCloseBtnPopup();
});

popupAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formValidator = handleValidFormAdd();
  if (!formValidator) return false;

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
