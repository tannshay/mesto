export default class Card {
    constructor(cardDetails, cardTemplate) {
      this._cardTemplate = cardTemplate;
      this._cardDetails = cardDetails;
      this._openPopup = this._openPopup.bind(this);
      this._closePopup = this._closePopup.bind(this);
      this._closePopupByEsc = this._closePopupByEsc.bind(this);
      this._popupBigImg = document.querySelector('.popup_photo');
      this._imgName = document.querySelector('.popup__subtitle');
      this._imgPopup = document.querySelector('.popup__img');
    }

    _closePopupByEsc = (evt) =>{
        if (evt.key === 'Escape'){
          const openedPopup = document.querySelector('.popup_opened');
          this._closePopup(openedPopup);
        }
      }

      _closePopup = (popupEl) => {
        popupEl.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._closePopupByEsc);
      };

    _openPopup = () => {
        this._popupBigImg.classList.add("popup_opened");
        document.addEventListener('keydown', this._closePopupByEsc);
      };
  
    _listenCard = (img) => {
      img.addEventListener("click", (evt) => {
        this._openPopup();
        this._imgPopup.src = img.src;
        this._imgName.textContent = img
          .closest(".mesto__element")
          .querySelector(".mesto__name").textContent;
        this._imgPopup.alt = img.alt;
      });
    };
  
    _switchLike = (evt) => {
      evt.target.classList.toggle("mesto__like_active");
    };
  
    _deletionCard = (evt) => {
      evt.target.closest(".mesto__element").remove();
    };
  
    createCard = () => {
      const newHtmlElement = this._cardTemplate.cloneNode(true);
      const img = newHtmlElement.querySelector(".mesto__img");
      img.src = this._cardDetails.link;
      img.alt = this._cardDetails.name;
      newHtmlElement.querySelector(".mesto__name").textContent = this._cardDetails.name;
  
      const likeCard = newHtmlElement.querySelector(".mesto__like");
      likeCard.addEventListener("click", this._switchLike);
  
      const cardDelete = newHtmlElement.querySelector(".mesto__delete");
      cardDelete.addEventListener("click", this._deletionCard);
      this._listenCard(img);
      return newHtmlElement;
    };
  }