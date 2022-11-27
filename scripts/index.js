import initialCards from "./initialData.js";
const cardsConteiner= document.querySelector(".mesto");
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
const cardName = popupAddCard.querySelector('.popup__text_type_name');
const cardImgLink = popupAddCard.querySelector('.popup__text_type_about');
const popupBigImg = document.querySelector('.popup_photo');
const imgName = document.querySelector('.popup__subtitle');
const imgPopup = document.querySelector('.popup__img');
const popups = document.querySelectorAll('.popup');
const popupAddCardSaveButton = popupAddCard.querySelector('.popup__save');

function render() {
  for(let i = initialCards.length - 1; i>=0; i--){
    renderCard(initialCards[i]);
  }
}

function switchLike(evt){
  evt.target.classList.toggle("mesto__like_active");
}

function deletionCard(evt){
  evt.target.closest(".mesto__element").remove();
}

function createCard(text) {
  const newHtmlElement = cardTemplate.cloneNode(true);
  const img = newHtmlElement.querySelector(".mesto__img");
  img.src = text.link;
  img.alt = text.name;
  newHtmlElement.querySelector(".mesto__name").textContent = text.name;

  const likeCard = newHtmlElement.querySelector(".mesto__like");
  likeCard.addEventListener("click", switchLike);

  const cardDelete = newHtmlElement.querySelector(".mesto__delete");
  cardDelete.addEventListener("click", deletionCard);
  listenCard(img);
  return(newHtmlElement);
}

function renderCard(card){
  cardsConteiner.prepend(createCard(card));
}

function listenCard(img) {
    img.addEventListener("click", function (evt) {
      openPopup(popupBigImg);
      imgPopup.src = img.src;
      imgName.textContent = img
        .closest(".mesto__element")
        .querySelector(".mesto__name").textContent;
      imgPopup.alt = img.alt;
    });
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
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function openAddCard(){
  popupAddCardSaveButton.classList.add('popup__save_disabled');
  popupAddCardSaveButton.setAttribute('disabled','disabled');
  openPopup(popupAddCard);
}

openingEditProfileButton.addEventListener("click", openEditPopup);

popupForm.addEventListener("submit", submitFormHandler);

openingPopupAddCardButton.addEventListener('click', openAddCard);

popupFormAddCard.addEventListener('submit', submitFormAddCardHandler);