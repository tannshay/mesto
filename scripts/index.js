import initialCards from "./initialData.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  errorSelector: '.popup__input-error',
  buttonDisableSelector: 'popup__save_disabled',
  fieldsetSelector: '.popup__input-fieldset'
}
const cardTemplate = document.querySelector(".mesto__element-template").content;
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupForm = popupEditProfile.querySelector(".popup__form");
const openingEditProfileButton = document.querySelector(".profile__edit");
const nameInput = popupEditProfile.querySelector(".popup__text_type_name");
const aboutInput = popupEditProfile.querySelector(".popup__text_type_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupAddCard = document.querySelector('.popup_add-card');
const openingPopupAddCardButton = document.querySelector('.profile__addbutton');
const popupFormAddCard = popupAddCard.querySelector('.popup__form');
const popups = document.querySelectorAll('.popup');
const cardsConteiner = document.querySelector(".mesto");
const cardName = popupAddCard.querySelector('.popup__text_type_name');
const cardImgLink = popupAddCard.querySelector('.popup__text_type_about');
const formValidators = {};

const handleCardClick = (name, link) => {
  const popupBigImg = document.querySelector('.popup_photo');
  const imgName = document.querySelector('.popup__subtitle');
  const imgPopup = document.querySelector('.popup__img');
  imgPopup.src = link;
  imgName.textContent = name;
  imgPopup.alt = name;
  popupBigImg.classList.add("popup_opened");
  function closePopupBigImg(){
    popupBigImg.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupBigImgByEsc);
  }
  function closePopupBigImgByEsc(evt){
    if (evt.key === 'Escape'){
      closePopupBigImg();
    }
  }
  document.addEventListener('keydown', closePopupBigImgByEsc);
}

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(selectors);


function createCard(cardDetails){
  const newCard = new Card(cardDetails,cardTemplate, handleCardClick);
  return newCard.createCard();
}

function renderCard(cardDetails){
  cardsConteiner.prepend(createCard(cardDetails));
}

function render() {
  for(let i = initialCards.length - 1; i>=0; i--){
    renderCard(initialCards[i]);
  }
}

render();

function closePopupByEsc(evt){
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openPopup = function (popupEl) {
  popupEl.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = function (popupEl) {
  popupEl.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (Array.from(evt.target.classList).includes("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

function submitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function submitFormAddCardHandler(evt){
  evt.preventDefault();
  const cardItem = {
      name: cardName.value,
      link: cardImgLink.value,
  }
  renderCard(cardItem);
  popupFormAddCard.reset();
  closePopup(popupAddCard);
}

function openEditPopup(){
  formValidators['formEditProfile'].resetValidation();
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function openPopupAddCard() {
  formValidators['formAddCard'].resetValidation();
  openPopup(popupAddCard);
} 

openingEditProfileButton.addEventListener("click", openEditPopup);

popupForm.addEventListener("submit", submitFormHandler);

openingPopupAddCardButton.addEventListener('click', openPopupAddCard);

popupFormAddCard.addEventListener('submit', submitFormAddCardHandler);