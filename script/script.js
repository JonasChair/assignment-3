const log = (logs) => console.log(logs);

const LINK = `https://64ec7004f9b2b70f2bfa53e4.mockapi.io`

const getData = async (endPoint) => {
    try {
        const response = await fetch(LINK + endPoint);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }

}

const buildItemWrapper = (item) => {
    const itemWrapper = document.createElement(`div`);
    itemWrapper.classList.add(`item-wrapper`);

    const itemName = document.createElement(`h3`);
    itemName.innerText = item.name;

    const itemImage = document.createElement(`img`);
    itemImage.src = item.image;

    const itemPrice = document.createElement(`div`);
    itemPrice.innerText = `${item.price}€`;
    
    const itemTextWrapper = document.createElement(`div`);
    itemTextWrapper.classList.add(`item-text-wrapper`);
    itemTextWrapper.append(itemName,itemPrice);
    
    itemWrapper.append(itemImage);
    itemWrapper.append(itemTextWrapper);

    return itemWrapper;
}

const buildItemsWrapper = (data) => {
    const itemsWrapper = document.createElement(`div`);
    itemsWrapper.classList.add(`items-wrapper`);

    data.forEach( (item) => {
        const itemWrapper = buildItemWrapper(item);
        itemsWrapper.append(itemWrapper);
    });

    return itemsWrapper;
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

const buildContent = (data) => {
    if (data) {
        return buildItemsWrapper(data);
    } else {
        return buildMessageWrapper(`Something went wrong while getting the data, please try again.`,`error`);
    }
}

const displayContent = (content,wrapper) => {
    wrapper.append(content);
}

const buildMain = async () => {
    const main = document.getElementById(`main`);
    const data = await getData(`/items`);
    log(data);
    const content = buildContent(data);
    displayContent(content,main);
}

buildMain();

