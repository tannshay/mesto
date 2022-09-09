const popupEl = document.querySelector('.popup');
const openEditProfileButton = document.querySelector('.profile__edit');
const closeEditProfileButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__name');
let aboutInput = document.querySelector('.popup__about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

openEditProfileButton.addEventListener('click', () => {
    popupEl.classList.add('popup_opened');
})

closeEditProfileButton.addEventListener('click', () => {
    popupEl.classList.remove('popup_opened');
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popupEl.classList.remove('popup_opened');
}

popupEl.addEventListener('submit', formSubmitHandler);