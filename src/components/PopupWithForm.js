import Popup from "./Popup.js"
export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
      super(popupSelector)
      this._inputForm = this._popupEl.querySelector(".popup__form")
      this._callbackSubmitForm = callbackSubmitForm
      this._inputList = Array.from(this._inputForm.querySelectorAll('.popup__text'))
      this._handleSubmitBind = this._handleSubmit.bind(this)
      this._submitButton = this._popupEl.querySelector('.popup__save')
    }
  
    _getInputValues(){
        this._inputValues = {}
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value
        })
        return this._inputValues
    }

    _handleSubmit(){
        this._callbackSubmitForm(this._getInputValues()).then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = 'Сохранить'
        })
      }
  
    close() {
      super.close()
      this._inputForm.reset()
    }
  
    setEventListeners() {
      super.setEventListeners()
      this._inputForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        this._submitButton.textContent = 'Сохранение...'
        this._handleSubmitBind()
      });
    }

    setInputValues(data){
        this._inputList.forEach((input) => {
            input.value = data[input.name]
        })
    }
  }