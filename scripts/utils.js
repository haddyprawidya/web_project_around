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
