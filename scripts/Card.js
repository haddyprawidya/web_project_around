import { handleCloseBtnPopup } from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._handleLikeButton();
    this._handleDeleteButton();
    this._handlePopupOpened();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = `Image ${this._name}`;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }

  _handleLikeButton() {
    const likeButton = this._element.querySelector(".card__like-icon");
    likeButton.addEventListener("click", function () {
      this.classList.toggle("card__like-icon_active");
    });
  }

  _handleDeleteButton() {
    const deleteButton = this._element.querySelector(".card__delete");
    deleteButton.addEventListener("click", function () {
      this.parentNode.remove();
    });
  }
  _handlePopupOpened() {
    const popImageContainer = document.querySelector(".popup_images");
    const imageItem = this._element.querySelector(".card__image");
    imageItem.addEventListener("click", () => {
      popImageContainer.querySelector(".popup__image").src = this._link;
      popImageContainer.querySelector(".popup__description").textContent =
        this._name;

      popImageContainer.classList.add("popup_opened");
      handleCloseBtnPopup();
    });
  }
}
