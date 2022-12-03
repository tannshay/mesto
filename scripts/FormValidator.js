export default class FormValdator {
    constructor(selectors, formElement){
        this._selectors = selectors;
        this._formElement = formElement;
    }

    _showInputError = (errorEl, errorMessage, inputEl) => {
        errorEl.textContent = errorMessage;
        inputEl.style.borderColor =  '#ff0000';
    }
    
    _hideInputError = (errorEl,inputEl) => {
        errorEl.textContent = '';
        inputEl.style.borderColor = '#000';
    }

    _checkInputValidity = (inputEl,fieldsetSelector,errorSelector) => {
        const isValid = inputEl.validity.valid;
        const formEl = inputEl.closest(fieldsetSelector);
        const errorEl = formEl.querySelector(errorSelector);
    
        if (isValid){
            this._hideInputError(errorEl,inputEl);   
        } else {
            this._showInputError(errorEl, inputEl.validationMessage, inputEl);
        }
    }

    _toggleButtonState = (inputs, submitButton, buttonDisableSelector) => {
        const hasInvalidInput = inputs.some(inputEl => !inputEl.validity.valid);
        if (hasInvalidInput){
            submitButton.classList.add(buttonDisableSelector);
            submitButton.setAttribute('disabled','disabled');
        } else {
            submitButton.classList.remove(buttonDisableSelector);
            submitButton.removeAttribute('disabled','disabled');
        }
    }

    enableValidation = () => {
            this._formElement.addEventListener('submit', e => e.preventDefault());
            const inputs = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
            inputs.forEach(input =>{
                input.addEventListener('input', () =>{
                    this._checkInputValidity(input,this._selectors.fieldsetSelector,this._selectors.errorSelector);
                    const submitButton = input.closest(this._selectors.formSelector).querySelector(this._selectors.submitButtonSelector);
                    this._toggleButtonState(inputs, submitButton, this._selectors.buttonDisableSelector);
                })
            })
    }
}