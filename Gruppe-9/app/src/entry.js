import { indexInit } from './index.js'
import { userpageInit } from './userpage.js'
import { orderInit } from './order.js'
import { cardInit } from './card.js'
import { helpInit } from './help.js'

switch (document.body.className) {
    case 'index':
        indexInit();
        break;

    case 'userpage':
        userpageInit();
        break;

    case 'order':
        orderInit();
        break;

    case 'help':
        helpInit();
        break;

    case 'card':
        cardInit();
        break;
}