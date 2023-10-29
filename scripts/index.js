import Card from "./Card.js";
import "./utils.js";

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
export const cardsContainer = document.querySelector(".cards");

initialCards.forEach((item) => {
  const card = new Card(item, "#template__cards");
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
});
