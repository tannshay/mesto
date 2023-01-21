const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
]

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  errorSelector: ".popup__input-error",
  buttonDisableSelector: "popup__save_disabled",
  fieldsetSelector: ".popup__input-fieldset",
}

const cardTemplate = document.querySelector(".mesto__element-template").content
const openingEditProfileButton = document.querySelector(".profile__edit")
const openingPopupAddCardButton = document.querySelector(".profile__addbutton")
const cardsContainer = document.querySelector(".mesto")
const formValidators = {}

export {initialCards, selectors, cardTemplate, openingEditProfileButton , openingPopupAddCardButton, cardsContainer, formValidators}
