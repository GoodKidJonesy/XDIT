/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const config = {
  apiKey: "AIzaSyBt40jnNFcwnslGRl_0moVb8Orldv6DRJo",
  authDomain: "xdit-4ed75.firebaseapp.com",
  projectId: "xdit-4ed75",
  storageBucket: "xdit-4ed75.appspot.com",
  messagingSenderId: "1031811285967",
  appId: "1:1031811285967:web:3d1164a3197d728b6208ba"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}