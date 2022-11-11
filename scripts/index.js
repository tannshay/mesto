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
];

const cards = document.querySelector(".mesto");
const cardTemplate = document.querySelector(".mesto__element-template").content;

function render() {
  for(let i = initialCards.length - 1; i>=0; i--){
    renderCard(initialCards[i]);
  }
}

function renderCard(text) {
  const newHtmlElement = cardTemplate.cloneNode(true);
  const img = newHtmlElement.querySelector(".mesto__img");
  img.src = text.link;
  img.alt = text.name;
  newHtmlElement.querySelector(".mesto__name").textContent = text.name;

  const likeCard = newHtmlElement.querySelector(".mesto__like");
  likeCard.addEventListener("click", (evt) => {
    evt.target.classList.toggle("mesto__like_active");
  });

  const cardDelete = newHtmlElement.querySelector(".mesto__delete");
  cardDelete.addEventListener("click", (evt) => {
    const currentCard = evt.target.closest(".mesto__element");
    currentCard.remove();
  });
  listenCard(img);
  cards.prepend(newHtmlElement);
}

function listenCard(img) {
    img.addEventListener("click", function (evt) {
      togglePopup(popupBigImg);
      imgLink.src = img.src;
      imgName.textContent = img
        .closest(".mesto__element")
        .querySelector(".mesto__name").textContent;
    });
  }

render();

const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupForm = popupEditProfile.querySelector(".popup__form");
const openEditProfileButton = document.querySelector(".profile__edit");
const closeEditProfileButton = popupEditProfile.querySelector(".popup__close-button");
const nameInput = popupEditProfile.querySelector(".popup__text_type_name");
const aboutInput = popupEditProfile.querySelector(".popup__text_type_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const togglePopup = function (popupEl) {
  popupEl.classList.toggle("popup_opened");
};

openEditProfileButton.addEventListener("click", function openpopup() {
  togglePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

closeEditProfileButton.addEventListener("click", function closepopup() {
  togglePopup(popupEditProfile);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  togglePopup(popupEditProfile);
}

popupForm.addEventListener("submit", formSubmitHandler);


const popupAddCard = document.querySelector('.popup_add-card');
const openPopupAddCardButton = document.querySelector('.profile__addbutton');
const closePopupAddCardButton = popupAddCard.querySelector('.popup__close-button');

openPopupAddCardButton.addEventListener('click', function openpopup(){
    togglePopup(popupAddCard);
});

closePopupAddCardButton.addEventListener('click', function closepopup(){
    togglePopup(popupAddCard);
});

const popupFormAddCard = popupAddCard.querySelector('.popup__form');
const cardName = popupAddCard.querySelector('.popup__text_type_name');
const cardImgLink = popupAddCard.querySelector('.popup__text_type_about');

function formAddCardSubmitHandler(evt){
    evt.preventDefault();
    const cardItem = {
        name: cardName.value,
        link: cardImgLink.value,
    }
    renderCard(cardItem);
    togglePopup(popupAddCard);
}

popupFormAddCard.addEventListener('submit', formAddCardSubmitHandler);

const popupBigImg = document.querySelector('.popup_photo');
const imgName = document.querySelector('.popup__subtitle');
const imgLink = document.querySelector('.popup__img');
const closePopupBigImg = popupBigImg.querySelector('.popup__close-button');


closePopupBigImg.addEventListener('click', function closepopup(){
    togglePopup(popupBigImg);
})