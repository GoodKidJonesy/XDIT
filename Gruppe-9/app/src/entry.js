import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';
import { initFirebaseAuth } from './fireFunctions.js';

import { indexInit } from './index.js'
import { userpageInit } from './userpage.js'
import { orderInit } from './order.js'
import { cardInit } from './card.js'
import { helpInit } from './help.js'

initializeApp(getFirebaseConfig());
initFirebaseAuth();

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

    case 'cardPage':
        cardInit();
        break;
}