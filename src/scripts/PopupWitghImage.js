import Popup from "./Popup.js"
export class PopupWithImage extends Popup {
    open(link, name) {
      this._imgPopup.src = link
      this._imgName.textContent = name
      this._imgPopup.alt = name
      super.open()
    }
  }