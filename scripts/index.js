const popupEl = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const openEditProfileButton = document.querySelector('.profile__edit');
const closeEditProfileButton = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_name');
const aboutInput = document.querySelector('.popup__text_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const togglePopup = function () {
    popupEl.classList.toggle('popup_opened');
}

openEditProfileButton.addEventListener('click', function () {
    togglePopup();
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
})

closeEditProfileButton.addEventListener('click', function () {
    togglePopup();
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    togglePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);