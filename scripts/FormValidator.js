export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._selectors.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  _showInputError = (inputEl) => {
    inputEl
      .closest(this._selectors.fieldsetSelector)
      .querySelector(this._selectors.errorSelector).textContent =
      inputEl.validationMessage;
    inputEl.style.borderColor = "#ff0000";
  };

  _hideInputError = (inputEl) => {
    inputEl
      .closest(this._selectors.fieldsetSelector)
      .querySelector(this._selectors.errorSelector).textContent = "";
    inputEl.style.borderColor = "#000";
  };

  _toggleButtonState = () => {
    const hasInvalidInput = this._inputList.some((inputEl) => !inputEl.validity.valid);
    if (hasInvalidInput) {
      this._submitButton.classList.add(this._selectors.buttonDisableSelector);
      this._submitButton.setAttribute("disabled", "disabled");
    } else {
      this._submitButton.classList.remove(this._selectors.buttonDisableSelector);
      this._submitButton.removeAttribute("disabled", "disabled");
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputEl) =>
      inputEl.addEventListener("input", () => {
        const isValid = inputEl.validity.valid;
        if (isValid) {
          this._hideInputError(inputEl);
        } else {
          this._showInputError(inputEl);
        }
        this._toggleButtonState();
      })
    );
  };

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  };
}