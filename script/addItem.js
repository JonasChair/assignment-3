import { displayContent } from "./src/sharedFuctions.js";
import { buildForm } from "./src/formControl.js";
const inputs = [
    {
        id: `item-name`,
        placeholder: `Input item name (min 3 characters)`,
        type: `text`
    },
    {
        id: `item-price`,
        placeholder: `Input the item price`,
        type: `number`
    },
    {
        id: `item-image`,
        placeholder: `Item image url`,
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