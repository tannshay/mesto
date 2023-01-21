export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popupEl.classList.add("popup_opened")
    document.addEventListener("keydown", this._handleEscClose)
  }

  close() {
    this._popupEl.classList.remove("popup_opened")
    document.removeEventListener("keydown", this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  setEventListeners() {
    this._popupEl.addEventListener("mousedown", (evt) => {
      if (Array.from(evt.target.classList).includes("popup_opened")) {
        this.close()
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.close()
      }
    })
  }
}