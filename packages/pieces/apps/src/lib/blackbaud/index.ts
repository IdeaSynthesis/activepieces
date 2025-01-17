import { createPiece } from "@activepieces/framework";
import { blackbaudCreateContacts } from "./actions/create-contacts";
import { blackbaudListContacts } from "./actions/list-contacts";

export const blackbaud = createPiece({
    name: 'blackbaud',
    displayName: "Blackbaud",
    logoUrl: 'https://cdn.activepieces.com/pieces/blackbaud.png',
    authors: ['abuaboud'],
    actions: [blackbaudCreateContacts, blackbaudListContacts],
    triggers: [],
});
