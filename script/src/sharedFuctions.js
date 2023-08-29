export const getData = async (endPoint) => {
    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

export const buildContentWrapper = (data,builder) => {
    if (data) {
        return builder(data);
    } else {
        return buildMessageWrapper(`Something went wrong while getting the data, please try again.`,`error`);
    }
}

const buildMessageWrapper = (message,status) => {
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

const displayContent = (content,wrapper) => {
    wrapper.append(content);
}

export const buildContent = async (dataEndpoint,builder,wrapperId) => {
    const wrapper = document.getElementById(wrapperId);
    const data = await getData(dataEndpoint);
    const content = buildContentWrapper(data,builder);
    displayContent(content,wrapper);
}