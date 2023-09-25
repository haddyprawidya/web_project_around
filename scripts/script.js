const profile = document.querySelector("#profile");
const profilName = profile.querySelector(".profile__name");
const profilAbout = profile.querySelector(".profile__about");

const editBtn = profile.querySelector(".profile__edit-button");

const popup = document.querySelector("#popup");
const popupEdit = popup.querySelector(".popup_edit");
const inputName = popupEdit.querySelector(".popup__input_name");
const inputDescription = popupEdit.querySelector(".popup__input_about");

function handleCloseBtnPopup() {
  const closeBtn = Array.from(popup.querySelectorAll(".popup__close"));
  closeBtn.forEach((item) => {
    const popupImage = popup.querySelector(".popup_images");
    item.addEventListener("click", () => {
      popupEdit.classList.remove("popup_opened");
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