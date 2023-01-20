import '../pages/index.css'

import initialCards from "./initialData.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import Section from "./Section.js"
import { PopupWithForm } from "./PopupWithForm.js"
import { PopupWithImage } from "./PopupWitghImage.js"
import UserInfo from "./UserInfo.js"
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  errorSelector: '.popup__input-error',
  buttonDisableSelector: 'popup__save_disabled',
  fieldsetSelector: '.popup__input-fieldset'
}
const cardTemplate = document.querySelector(".mesto__element-template").content
const openingEditProfileButton = document.querySelector(".profile__edit")
const openingPopupAddCardButton = document.querySelector(".profile__addbutton")
const cardsContainer = document.querySelector(".mesto")
const formValidators = {}

const handleEditFormSubmit = ({name, about}) => {
  userInfo.setUserInfo(name, about)
}
const handleCardFormSubmit = ({imgName, imgLink}) => {
  const newCard = new Card({name: imgName, link: imgLink}, cardTemplate, handleCardClick)
  section.addItem(newCard.createCard())
}

const popupEditProfile = new PopupWithForm(".popup_edit-profile", handleEditFormSubmit)
const popupAddCard = new PopupWithForm(".popup_add-card", handleCardFormSubmit)
const popupBigImg = new PopupWithImage(".popup_photo")
const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'})

const handleCardClick = (name, link) => {
  popupBigImg.open(link,name)
  popupBigImg.setEventListeners()
}

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement)
    const formName = formElement.getAttribute("name")
    formValidators[formName] = validator
    validator.enableValidation()
  })
}

const section = new Section({items: initialCards, renderer: renderCard}, cardsContainer)
section.renderItems()

function createCard(cardDetails){
  const card = new Card(cardDetails,cardTemplate, handleCardClick)
  return card.createCard()
}

function renderCard(cardData) {
  const cardElement = createCard(cardData)
  section.addItem(cardElement)
}

enableValidation(selectors)

function openEditPopup(){
  formValidators['formEditProfile'].resetValidation()
  popupEditProfile.setInputValues(userInfo.getUserInfo())
  popupEditProfile.open.bind(popupEditProfile)()
  popupEditProfile.setEventListeners()
}

function openPopupAddCard() {
  formValidators['formAddCard'].resetValidation()
  popupAddCard.open()
  popupAddCard.setEventListeners()
}

openingEditProfileButton.addEventListener("click", openEditPopup)

openingPopupAddCardButton.addEventListener('click', openPopupAddCard)