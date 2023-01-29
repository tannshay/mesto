export default class Card {
    constructor(cardDetails, cardTemplate, userId, handleCardClick, handleLikeClick, deletionCard) {
      this._cardTemplate = cardTemplate
      this._cardDetails = cardDetails
      this._handleCardClick = handleCardClick
      this._handleLikeClick = handleLikeClick
      this._userId = userId
      this._ownerId = this._cardDetails.owner._id
      this._deletionCard = deletionCard
    }

    _setEventListeners = () => {
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick(this._cardDetails.name, this._cardDetails.link)
        })
        this._likeCardButton.addEventListener('click', () => this._handleLikeClick(this))
        this._cardDeleteButton.addEventListener('click', (evt) => {
          this._deletionCard(this._cardDetails, evt.target.closest('.mesto__element'))
        })
    }
  
    isLiked(){
      let isLiked = false
      this._cardDetails.likes.forEach((like) => {
        if(like._id === this._userId){
          isLiked = true
        }
      })
      return isLiked
    }

    delete(){
      console.log('asdasd')
    }

    switchLike(){
      if (this.isLiked()){
        this._likeCardButton.classList.remove('mesto__like_type_heart_active')
        this._likeCounter.textContent = parseInt(this._likeCounter.textContent) - 1
      } else{
        this._likeCardButton.classList.add('mesto__like_type_heart_active')
        this._likeCounter.textContent = parseInt(this._likeCounter.textContent) + 1
      }
    }
  
    createCard = () => {
      const newHtmlElement = this._cardTemplate.cloneNode(true)
      this._cardImg = newHtmlElement.querySelector('.mesto__img')
      this._cardImg.src = this._cardDetails.link
      this._cardImg.alt = this._cardDetails.name
      this._likeCounter = newHtmlElement.querySelector('.mesto__like_type_counter')
      this._likeCounter.textContent = this._cardDetails.likes.length
      newHtmlElement.querySelector('.mesto__name').textContent = this._cardDetails.name
      this._likeCardButton = newHtmlElement.querySelector('.mesto__like_type_heart')
      this._cardDeleteButton = newHtmlElement.querySelector('.mesto__delete')
      this._setEventListeners()
      if(this._ownerId !== this._userId){
        newHtmlElement.querySelector('.mesto__delete').style.display = 'none'
      }
      if (this.isLiked()) {
        this._likeCardButton.classList.add('mesto__like_type_heart_active')
      }
      return newHtmlElement
    };
  }