const main = document.querySelector('#main');
const editButton = main.querySelector('.profile__edit-button');
const closeButton = main.querySelector('.popup__close');
const editProfile = main.querySelector('.popup');


function popupToggle() {
    editProfile.classList.toggle('popup__opened');
};

closeButton.addEventListener('click', popupToggle);
editButton.addEventListener('click', popupToggle);


const profilName = main.querySelector('.profile__name');
const profilAbout = main.querySelector('.profile__about');
const inputName = main.querySelector('.popup__input_name');
const inputDescription = main.querySelector('.popup__input_about');
const submitButton = main.querySelector('.popup__submit');

inputName.value = profilName.textContent;
inputDescription.value = profilAbout.textContent;

submitButton.addEventListener('click', function(evt){
    evt.preventDefault();
    profilName.textContent = inputName.value;
    profilAbout.textContent = inputDescription.value;
    
    popupToggle();
});

