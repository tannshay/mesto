const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    errorSelector: '.popup__input-error',
    buttonDisableSelector: 'popup__save_disabled',
    fieldsetSelector: '.popup__input-fieldset'
}

const showInputError = (errorEl, errorMessage, inputEl) => {
    errorEl.textContent = errorMessage;
    inputEl.style.borderColor =  '#ff0000';
}

const hideInputError = (errorEl,inputEl) => {
    errorEl.textContent = '';
    inputEl.style.borderColor = '#000';
}

const checkInputValidity = (inputEl,fieldsetSelector,errorSelector) =>{
    const isValid = inputEl.validity.valid;
    const formEl = inputEl.closest(fieldsetSelector);
    const errorEl = formEl.querySelector(errorSelector);

    if (isValid){
        hideInputError(errorEl,inputEl);   
    } else {
        showInputError(errorEl, inputEl.validationMessage, inputEl);
    }
}

const toggleButtonState = (inputs, submitButton, buttonDisableSelector) => {
    const hasInvalidInput = inputs.some(inputEl => !inputEl.validity.valid);
    if (hasInvalidInput){
        submitButton.classList.add(buttonDisableSelector);
        submitButton.setAttribute('disabled','disabled');
    } else {
        submitButton.classList.remove(buttonDisableSelector);
        submitButton.removeAttribute('disabled','disabled');
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, errorSelector, buttonDisableSelector, fieldsetSelector}){
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', e => e.preventDefault());
        const inputs = Array.from(form.querySelectorAll(inputSelector));
        inputs.forEach(input =>{
            input.addEventListener('input', () =>{
                checkInputValidity(input,fieldsetSelector,errorSelector);
                const submitButton = input.closest(formSelector).querySelector(submitButtonSelector);
                toggleButtonState(inputs, submitButton, buttonDisableSelector);
            })
        })
    });
}

enableValidation(selectors);