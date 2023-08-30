import { API_URL } from "../src/sharedFuctions.js";

const IMG_URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/i;

const setValidationMessage = (inputId, message, status) => {
    const validationMessageWrapper = document.getElementById(inputId + `-validation-message`);
    validationMessageWrapper.innerText = message;
    validationMessageWrapper.classList.add(status);
}

const checkInputData = (input) => {
    if (input.value) {
        setValidationMessage(input.id, ``, `reset`);
        switch (input.id) {
            case (`item-name`):
                if (input.value.length >= 3) {
                    input.classList.add(`success`);
                    return true;
                } else {
                    input.classList.remove(`success`);
                    setValidationMessage(input.id, `Name is too short (minimum 3 characters).`, `error`);
                    return false;
                }
            case (`item-price`):
                if (input.value > 0) {
                    input.classList.add(`success`);
                    return true;
                } else {
                    input.classList.remove(`success`);
                    setValidationMessage(input.id, `Price can't be negative or 0.`, `error`);
                    return false;
                }
            case (`item-image`):
                if (IMG_URL_REGEX.test(input.value)) {
                    input.classList.add(`success`);
                    return true;
                } else {
                    input.classList.remove(`success`);
                    setValidationMessage(input.id, `The link is not valid, please check.`, `error`);
                    return false;
                }
            case (`item-description`):
                input.classList.add(`success`);
                return true;
            case (`item-location`):
                input.classList.add(`success`);
                return true;
        }
    } else {
        input.classList.remove(`success`);
        setValidationMessage(input.id, `Please fill the above input`, `error`);
        return false;
    }
}

const getInputsArray = () => {
    const inputs = document.getElementsByTagName(`input`);
    return Array.from(inputs);
}

const validateInputs = () => {
    let isValid = true;
    getInputsArray().forEach((input) => {
        if (!checkInputData(input)) {
            isValid = false;
        }
    });
    return isValid;
}


const createItem = () => {
    const item = {}
    getInputsArray().forEach((input) => {
        const dataName = input.id.slice(input.id.indexOf(`-`) + 1);
        item[dataName] = input.value;
    });
    console.log(item);
    return item;
};


const postItemData = async (item) => {
    try {
        const response = await fetch(API_URL + `/items`, {
            method: `POST`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        const addedItem = await response.json();
        console.log(addedItem);
        return addedItem;
    } catch (err) {
        return false;
    }
}

const clearInputFields = (inputFields) =>{
    inputFields.forEach(input => {
        input.value = ``;
        input.classList.remove(`success`);
    });
}

const onItemSubmited = (item) => {
    const responseMessageWrapper = document.getElementById(`response-message-wrapper`);
    if (item) {
        responseMessageWrapper.innerText = `Item: "${item.name}", was added.`;
        responseMessageWrapper.style.color = `green`;
        clearInputFields(getInputsArray());
    } else {
        responseMessageWrapper.innerText = `Something went wrong please try again.`;
        responseMessageWrapper.style.color = `red`;
    }
}

const onClickSubmitItem = async () => {
    if (validateInputs()) {
        const response = await postItemData(createItem());
        onItemSubmited(response);
    }
}

const buildInput = (inputId, placeholder, inputType) => {
    const inputWrapper = document.createElement(`div`);
    inputWrapper.classList.add(`input-wrapper`);
    
    const input = document.createElement(inputType === `button` ? inputType : `input`);
    input.id = inputId;

    if (inputType === `button`) {
        input.innerText = placeholder;
        input.addEventListener(`click`, onClickSubmitItem)
        const responseMessageWrapper = document.createElement(`div`);
        responseMessageWrapper.id = `response-message-wrapper`;
        inputWrapper.append(input,responseMessageWrapper);
    } else {
        input.type = inputType;
        input.placeholder = placeholder;
        input.addEventListener(`focusout`, (e) => {
            checkInputData(e.target);
        })
        const validationMessageWrapper = document.createElement(`div`);
        validationMessageWrapper.id = inputId + `-validation-message`;
        validationMessageWrapper.classList.add(`validation-message`);
        inputWrapper.append(input, validationMessageWrapper);
    }
    
    return inputWrapper;
}

export const buildForm = (inputs) => {
    const formWrapper = document.createElement(`div`);
    formWrapper.classList.add(`form`);

    inputs.forEach((input) => {
        formWrapper.append(buildInput(input.id, input.placeholder, input.type));
    })

    formWrapper.append(buildInput(`submit-button`, `Submit item`, `button`));

    return formWrapper;
}