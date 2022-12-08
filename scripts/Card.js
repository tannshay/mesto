export default class Card {
    constructor(cardDetails, cardTemplate, handleCardClick) {
      this._cardTemplate = cardTemplate;
      this._cardDetails = cardDetails;
      this._handleCardClick = handleCardClick;
    }

    _setEventListeners = () => {
        this._CardImg.addEventListener('click', () => {
            this._handleCardClick(this._cardDetails.name, this._cardDetails.link);
        })
        this._likeCard.addEventListener('click', this._switchLike);
        this._cardDeleteButton.addEventListener('click', this._deletionCard);
    }
  
    _switchLike = (evt) => {
      evt.target.classList.toggle('mesto__like_active');
    };
  
    _deletionCard = (evt) => {
      evt.target.closest('.mesto__element').remove();
    };
  
    createCard = () => {
      const newHtmlElement = this._cardTemplate.cloneNode(true);
      this._CardImg = newHtmlElement.querySelector('.mesto__img');
      this._CardImg.src = this._cardDetails.link;
      this._CardImg.alt = this._cardDetails.name;
      newHtmlElement.querySelector('.mesto__name').textContent = this._cardDetails.name;
      this._likeCard = newHtmlElement.querySelector('.mesto__like');
      this._cardDeleteButton = newHtmlElement.querySelector('.mesto__delete');
      this._setEventListeners();
      return newHtmlElement;
    };
  }