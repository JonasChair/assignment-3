import { buildContent, log, API_URL, buildMessageWrapper } from "./src/sharedFuctions.js";

const url = new URL(window.location.href);
const itemId = url.searchParams.get('itemId');

const deleteItem = async (item) => {
    const response = await fetch(`${API_URL}/items/${item.id}`, {
        method: `DELETE`
    })
    const deletedItem = await response.json();
    if (deletedItem) {
        main.append(buildMessageWrapper(`Item: "${deletedItem.name}", has been deleted`));
    } else {
        main.append(buildMessageWrapper(`Something went wrong, please try again.`, `error`));
    }
}

const buildItemWrapper = (item) => {
    const itemWrapper = document.createElement(`div`);
    itemWrapper.classList.add(`item`);

    const itemHeadWrapper = document.createElement(`div`);

    const itemNameWrapper = document.createElement(`h3`);
    itemNameWrapper.innerText = item.name;

    const itemImage = document.createElement(`img`);
    itemImage.src = item.image;

    const itemPriceWrapper = document.createElement(`h3`);
    itemPriceWrapper.innerText = item.price + `€`;

    const itemBodyWrapper = document.createElement(`div`);

    const itemLocationWrapper = document.createElement(`div`);
    itemLocationWrapper.innerText = `Item sold at: ${item.location}`;

    const itemDescriptionWrapper = document.createElement(`div`);
    itemDescriptionWrapper.innerText = item.description;

    itemHeadWrapper.append(itemNameWrapper, itemImage, itemPriceWrapper);
    itemBodyWrapper.append(itemLocationWrapper, itemDescriptionWrapper);

    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`delete-button`);
    deleteButton.innerText = `Delete this item`;
    deleteButton.addEventListener(`click`, () => deleteItem(item))

    itemWrapper.append(itemHeadWrapper, itemBodyWrapper, deleteButton);

    return itemWrapper;
}

buildContent(`${API_URL}/items/${itemId}`, buildItemWrapper, `main`);