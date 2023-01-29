import Popup from "./Popup.js"
export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
      super(popupSelector)
      this._inputForm = this._popupEl.querySelector(".popup__form")
      this._callbackSubmitForm = callbackSubmitForm
      this._inputList = Array.from(this._inputForm.querySelectorAll('.popup__text'))
      this._handleSubmitBind = this._handleSubmit.bind(this)
    }
  
    _getInputValues(){
        this._inputValues = {}
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value
        })
        return this._inputValues
    }

    _handleSubmit(evt){
        evt.preventDefault()
        this._callbackSubmitForm(this._getInputValues()).then(() =>{
          this.close()
        })
      }
  
    close() {
      super.close()
      this._inputForm.reset()
    }
  
    setEventListeners() {
      super.setEventListeners()
      this._inputForm.addEventListener("submit", this._handleSubmitBind)
    }

    setInputValues(data){
        this._inputList.forEach((input) => {
            input.value = data[input.name]
        })
    }
  }