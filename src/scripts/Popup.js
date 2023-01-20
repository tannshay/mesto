export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector)
    this._imgPopup = document.querySelector(".popup__img")
    this._imgName = document.querySelector(".popup__subtitle")
  }

  open() {
    this._popupEl.classList.add("popup_opened")
    document.addEventListener("keydown", this._closePopupByEsc.bind(this))
  }

  close() {
    this._popupEl.classList.remove("popup_opened")
    document.removeEventListener("keydown", this._closePopupByEsc.bind(this))
  }

  _closePopupByEsc(evt) {
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