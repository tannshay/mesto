import Popup from "./Popup.js"
export class PopupWithSubmit extends Popup {
    constructor(popupSelector, callbackSubmitForm){
        super(popupSelector)
        this._callbackSubmitForm = callbackSubmitForm
        this._form = this._popupEl.querySelector(".popup__form")
    }

    open(cardId, card){
        super.open()
        this._cardId = cardId
        this._card = card
    }

    setEventListeners(){
        this._form.addEventListener("submit", () => {
            this._callbackSubmitForm(this._cardId, this._card)
            this.close()
        })
    }
}