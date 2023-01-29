import '../pages/index.css'

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import UserInfo from "../components/UserInfo.js"
import Api from '../components/Api.js'
import {selectors, cardTemplate, openingEditProfileButton , openingPopupAddCardButton, cardsContainer, avatarChangeButton,formValidators} from '../utils/constants.js'
let section
const handleCardClick = (name, link) => {
  popupBigImg.open(link,name)
}

const deletionCard = (cardObj, card) =>{
  popupDeleteConfirm.open(cardObj._id, card)
}

const handleLikeClick = (cardObject) => {
  if(cardObject.isLiked()){
    api.deleteLike(cardObject._cardDetails._id, cardObject._userId).then((res) => cardObject._cardDetails.likes = res.likes)
  } else {
    api.putLike(cardObject._cardDetails._id, cardObject._userId).then((res) => cardObject._cardDetails.likes = res.likes)
  }
  cardObject.switchLike()
}
function renderCard(cardData) {
  const cardElement = createCard(cardData)
  section.addItem(cardElement)
}

  function createCard(cardDetails){
  const card = new Card(cardDetails,cardTemplate, userInfo.getUserId(), handleCardClick, handleLikeClick, deletionCard)
  return card.createCard()
}


const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-57',
  headers: {
    Authorization: "3bde6ae5-14e9-4ecc-8f2b-83b8e9e59fc9",
    'content-type': 'application/json'
  }
})

const promiseUserInfo = api.getUserInfo()
const promiseGetInitialCards = api.getInitialCards()

Promise.all([promiseUserInfo, promiseGetInitialCards])
.then((res) => {
  userInfo.setUserInfo({name: res[0].name, about: res[0].about, id: res[0]._id, avatar: res[0].avatar})
  const initialCards = []
  res[1].reverse().forEach((item, i) => {
    initialCards[i] = item
  })

  section = new Section({items: initialCards, renderer: renderCard}, cardsContainer)
  section.renderItems()
}).catch((err) => {
  console.log(err)
})

const handleEditFormSubmit = (data) => {
  document.querySelector('.popup_edit-profile').querySelector('.popup__save').textContent = 'Сохранение...'
  return api.setUserInfo({newName: data.name, newAbout: data.about}).then(() => {
    userInfo.setUserInfo(data)
  }).finally(() => {
    document.querySelector('.popup_edit-profile').querySelector('.popup__save').textContent = 'Сохранить'
  })
}
const handleCardFormSubmit = ({imgName, imgLink}) => {
  document.querySelector('.popup_add-card').querySelector('.popup__save').textContent = 'Сохранение...'
  return api.postCard({newName: imgName, newLink: imgLink})
  .then((res) => {
    renderCard(res)
  }).finally(() =>{
    document.querySelector('.popup_add-card').querySelector('.popup__save').textContent = 'Сохранить'
  })
}

const handleAvatarFormSubmit = (avaLink) =>{
  document.querySelector('.popup_change-avatar').querySelector('.popup__save').textContent = 'Сохранение...'
  return api.changeAvatar(avaLink).then((res) => {
    userInfo.setAvatar(res.avatar)
  }).finally(() => {
    document.querySelector('.popup_change-avatar').querySelector('.popup__save').textContent = 'Сохранить'
  })
}

const handleDeleteFormSubmit = (cardId, card) => {
  api.deleteCard(cardId).then(() => {
    card.remove()
  })
}

const popupEditProfile = new PopupWithForm(".popup_edit-profile", handleEditFormSubmit)
popupEditProfile.setEventListeners()
const popupAddCard = new PopupWithForm(".popup_add-card", handleCardFormSubmit)
popupAddCard.setEventListeners()
const popupBigImg = new PopupWithImage(".popup_photo")
popupBigImg.setEventListeners()
const popupDeleteConfirm = new PopupWithSubmit('.popup_delete', handleDeleteFormSubmit)
popupDeleteConfirm.setEventListeners()
const popupChangeAvatar = new PopupWithForm('.popup_change-avatar', handleAvatarFormSubmit)
popupChangeAvatar.setEventListeners()
const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'})

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement)
    const formName = formElement.getAttribute("name")
    formValidators[formName] = validator
    validator.enableValidation()
  })
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

avatarChangeButton.addEventListener('click', () => {
  formValidators['formChangeAvatar'].resetValidation()
  popupChangeAvatar.open()
})