import {buildContent, API_URL} from "./src/sharedFuctions.js";

const redirectToItemPage = (item) => {
    window.location.replace(`./item.html?itemId=${item.id}`);
}

const buildItemWrapper = (item) => {
    const itemWrapper = document.createElement(`div`);
    itemWrapper.classList.add(`item-wrapper`);

    itemWrapper.addEventListener(`click`, () => {
        redirectToItemPage(item);
    })

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

buildContent(`${API_URL}/items`,buildItemsWrapper,'main');