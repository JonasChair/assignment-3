import {buildContent , log, LINK} from "./src/sharedFuctions.js";

const url = new URL(window.location.href);
const itemId = url.searchParams.get('itemId');

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
    
    item.description
    itemHeadWrapper.append(itemNameWrapper,itemImage,itemPriceWrapper);
    itemBodyWrapper.append(itemLocationWrapper,itemDescriptionWrapper);

    itemWrapper.append(itemHeadWrapper,itemBodyWrapper);

    return itemWrapper;
}

buildContent(`${LINK}/items/${itemId}`,buildItemWrapper,`main`);