import initialCards from "./initialData.js";
const cardsConteiner= document.querySelector(".mesto");
const cardTemplate = document.querySelector(".mesto__element-template").content;
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupForm = popupEditProfile.querySelector(".popup__form");
const openingEditProfileButton = document.querySelector(".profile__edit");
const closingEditProfileButton = popupEditProfile.querySelector(".popup__close-button");
const nameInput = popupEditProfile.querySelector(".popup__text_type_name");
const aboutInput = popupEditProfile.querySelector(".popup__text_type_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupAddCard = document.querySelector('.popup_add-card');
const openingPopupAddCardButton = document.querySelector('.profile__addbutton');
const closingPopupAddCardButton = popupAddCard.querySelector('.popup__close-button');
const popupFormAddCard = popupAddCard.querySelector('.popup__form');
const cardName = popupAddCard.querySelector('.popup__text_type_name');
const cardImgLink = popupAddCard.querySelector('.popup__text_type_about');
const popupBigImg = document.querySelector('.popup_photo');
const imgName = document.querySelector('.popup__subtitle');
const imgPopup = document.querySelector('.popup__img');
const closingPopupBigImg = popupBigImg.querySelector('.popup__close-button');

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

function closePopupByEsc(popupEl){
  document.addEventListener('keydown', (key) => {
    if (key.key === "Escape"){
      popupEl.classList.remove("popup_opened");
    }
  })
}

function closePopupByOverlay(popupEl){
  document.addEventListener('mousedown', (evt) => {
    if (evt.target === popupEl){
      popupEl.classList.remove("popup_opened");
    }
  })
}

const openPopup = function (popupEl) {
  popupEl.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc(popupEl));
  popupEl.addEventListener('mousedown',closePopupByOverlay(popupEl))
};

const closePopup = function (popupEl) {
  popupEl.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc(popupEl));
  popupEl.removeEventListener('mousedown',closePopupByOverlay(popupEl))
};

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

openingEditProfileButton.addEventListener("click", function openpopup() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

closingEditProfileButton.addEventListener("click", function closepopup() {
  closePopup(popupEditProfile);
});

popupForm.addEventListener("submit", submitFormHandler);

openingPopupAddCardButton.addEventListener('click', function openpopup(){
    openPopup(popupAddCard);
});

closingPopupAddCardButton.addEventListener('click', function closepopup(){
    closePopup(popupAddCard);
});

popupFormAddCard.addEventListener('submit', submitFormAddCardHandler);

closingPopupBigImg.addEventListener('click', function closepopup(){
    closePopup(popupBigImg);
});