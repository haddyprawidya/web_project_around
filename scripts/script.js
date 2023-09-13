const main = document.querySelector("#main");
const editButton = main.querySelector(".profile__edit-button");
const editProfile = main.querySelector(".popup");
const closeButton = editProfile.querySelector(".popup__close");

function popupToggle() {
  editProfile.classList.toggle("popup__opened");
  inputName.value = profilName.textContent;
  inputDescription.value = profilAbout.textContent;
  submitButton.disabled = true;
}

closeButton.addEventListener("click", popupToggle);
editButton.addEventListener("click", popupToggle);

const profilName = main.querySelector(".profile__name");
const profilAbout = main.querySelector(".profile__about");
const inputName = editProfile.querySelector(".popup__input_name");
const inputDescription = editProfile.querySelector(".popup__input_about");
const submitButton = editProfile.querySelector(".popup__submit");

function changeForm() {
  const nameValue = inputName.value;
  const descriptionValue = inputDescription.value;
  const profileNameText = profilName.textContent;
  const profileAboutText = profilAbout.textContent;
  const isAnyInputEmpty = nameValue === "" || descriptionValue === "";
  const hasChanged = nameValue !== profileNameText || descriptionValue !== profileAboutText;
  submitButton.disabled = !(hasChanged && !isAnyInputEmpty);
}

editProfile.addEventListener("input", changeForm);

submitButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilAbout.textContent = inputDescription.value;
  popupToggle();
});
