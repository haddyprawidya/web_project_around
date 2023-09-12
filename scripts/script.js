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
  if (
    inputName.value !== profilName.textContent ||
    inputDescription.value !== profilAbout.textContent
  ) {
    submitButton.disabled = false;
    if (inputName.value === "" || inputDescription.value === "") {
      submitButton.disabled = true;
    }
  }
}

editProfile.addEventListener("input", changeForm);

submitButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilAbout.textContent = inputDescription.value;
  popupToggle();
});
