import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';
import { initFirebaseAuth, signIn, signOutUser } from './fireFunctions.js';

import { indexInit } from './index.js'
import { userpageInit } from './userpage.js'
import { orderInit } from './order.js'
import { cardInit } from './card.js'
import { helpInit } from './help.js'

initializeApp(getFirebaseConfig());
initFirebaseAuth();

var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');

signOutButtonElement.addEventListener('click', signOutUser);
signInButtonElement.addEventListener('click', signIn);

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