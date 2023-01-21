import Popup from "./Popup.js"
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._imgPopup = document.querySelector(".popup__img")
    this._imgName = document.querySelector(".popup__subtitle")
  }

  open(link, name) {
    this._imgPopup.src = link
    this._imgName.textContent = name
    this._imgPopup.alt = name
    super.open()
  }
}
