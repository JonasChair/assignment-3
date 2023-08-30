export const log = (logs) => console.log(logs);

export const API_URL = `https://64ec7004f9b2b70f2bfa53e4.mockapi.io`

export const getData = async (endPoint) => {
    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

export const buildContentWrapper = (data, builder) => {
    if (data) {
        return builder(data);
    } else {
        return buildMessageWrapper(`Something went wrong while getting the data, please try again.`, `error`);
    }
}

export const buildMessageWrapper = (message, status) => {
    const messageWrapper = document.createElement(`div`);
    messageWrapper.classList.add(`message`);
    messageWrapper.innerText = message;
    switch (status) {
        case (`error`):
            messageWrapper.classList.add(`error`);
            break;
        default:
            messageWrapper.classList.add(`success`);
    }
    return messageWrapper;
}

export const displayContent = (content, wrapperId) => {
    const wrapper = document.getElementById(wrapperId);
    wrapper.append(content);
}

export const buildContent = async (dataEndpoint, builder, wrapperId) => {
    const data = await getData(dataEndpoint);
    const content = buildContentWrapper(data, builder);
    displayContent(content, wrapperId);
}

const buildInput = (inputId, placeholder, inputType) => {
    const inputWrapper = document.createElement(`div`);
    inputWrapper.classList.add(`input-wrapper`);

    const input = document.createElement(`input`);
    input.id = inputId;
    input.type = inputType;
    if (inputType === `button`) {
        input.value = placeholder;
        inputWrapper.append(input);
        return inputWrapper;
    } else {
        input.placeholder = placeholder;
    }

    const validationMessageWrapper = document.createElement(`div`);
    validationMessageWrapper.id = inputId + `-validation`;

    inputWrapper.append(input, validationMessageWrapper);
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