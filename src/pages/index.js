import '../pages/index.css'

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import {initialCards, selectors, cardTemplate, openingEditProfileButton , openingPopupAddCardButton, cardsContainer, formValidators} from '../utils/constants.js'


const handleEditFormSubmit = ({name, about}) => {
  userInfo.setUserInfo(name, about)
}
const handleCardFormSubmit = ({imgName, imgLink}) => {
  section.addItem(createCard({name: imgName, link: imgLink}))
}

const popupEditProfile = new PopupWithForm(".popup_edit-profile", handleEditFormSubmit)
popupEditProfile.setEventListeners()
const popupAddCard = new PopupWithForm(".popup_add-card", handleCardFormSubmit)
popupAddCard.setEventListeners()
const popupBigImg = new PopupWithImage(".popup_photo")
popupBigImg.setEventListeners()
const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'})

const handleCardClick = (name, link) => {
  popupBigImg.open(link,name)
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
}

function openPopupAddCard() {
  formValidators['formAddCard'].resetValidation()
  popupAddCard.open()
}

openingEditProfileButton.addEventListener("click", openEditPopup)

openingPopupAddCardButton.addEventListener('click', openPopupAddCard)