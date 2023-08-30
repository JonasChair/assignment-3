import { API_URL, displayContent, buildForm} from "./src/sharedFuctions.js";

const inputs = [
    {
        id: `item-name`,
        placeholder: `Input item name`,
        type: `text`
    },
    {
        id: `item-price`,
        placeholder: `Input the item price`,
        type: `number`
    },
    {
        id: `item-immage`,
        placeholder: `Item immage url`,
        type: `text`
    },
    {
        id: `item-description`,
        placeholder: `Item description`,
        type: `text`
    },
    {
        id: `item-location`,
        placeholder: `Item sale location`,
        type: `text`
    }
]

displayContent(buildForm(inputs), `main`);