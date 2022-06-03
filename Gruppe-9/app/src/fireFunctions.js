/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    getDocs,
    serverTimestamp,
    limitToLast,
    Query,
} from 'firebase/firestore';

// Firebase sign-in.
export async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    location.reload();
}

// Firebase sign-out.
export function signOutUser() {
    signOut(getAuth());
    if (document.body.className != "help" && document.body.className != "order") {
        location.href = "index.html";
    }
}

// Initiate firebase auth
export function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || '../resources/ic_person_24px.png';
}

// Returns the signed-in user's display name.
function getUserName() {
    try {
        return getAuth().currentUser.displayName;
    } catch (er) { console.log("User logged in: " + isUserSignedIn()) }
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
    return !!getAuth().currentUser;
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedIn() {
    // Return true if the user is signed in Firebase
    if (isUserSignedIn()) {
        return true;
    }

    // Display a message to the user using a Toast.
    var data = {
        message: 'You must sign-in first',
        timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return false;
}
// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return url + '?sz=150';
    }
    return url;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) {
        // User is signed in!
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        userPicElement.src = addSizeToGoogleProfilePic(profilePicUrl);
        userPicElement.removeAttribute('hidden');
        signOutButtonElement.removeAttribute('hidden');
        defaultPicElement.setAttribute('hidden', 'true');
        signInButtonElement.setAttribute('hidden', 'true');
    }
    else {
        // User is signed out!
        // Hide user's profile and sign-out button.
        userPicElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');
        signInButtonElement.removeAttribute('hidden');

        //Show sign-in button.
        defaultPicElement.removeAttribute('hidden');
        signInButtonElement.removeAttribute('hidden');
    }
}
export async function bookCar(car) {
    try {
        await addDoc(collection(getFirestore(), getAuth().currentUser.email + "booking"), {
            model: car.model,
            time: serverTimestamp(),
            price: car.price,
            location: car.location
        });
        console.log("Car successfully booked");
    } catch (err) { console.log(err); }
}

export async function endBooking() {
    try {
        await addDoc(collection(getFirestore(), getAuth().currentUser.email + "booking"), {
            model: "none",
            time: serverTimestamp(),
        });
        console.log("Car unbooked");
    } catch (err) { console.log(err); }
}

export async function getBooking() {
    let order = undefined;
    const querySnapshot = await getDocs(collection(getFirestore(), getAuth().currentUser.email + "booking"));
    querySnapshot.forEach((doc) => {
        if (order == undefined || order.time < doc.data().time) order = doc.data();
    }); //get latest booking
    return order;
}

export async function hasActiveCar() {
    let booking = (await getBooking());
    if (booking == undefined) return false;
    return booking.model != "none";
}

export async function getCars() {
    let cars = [];
    const querySnapshot = await getDocs(collection(getFirestore(), "cars"));
    querySnapshot.forEach((doc) => {
        cars.push(doc.data());
    });
    return cars;
}


// Shortcuts to DOM Elements.
var userPicElement = document.getElementById('user-pic');
var defaultPicElement = document.getElementById('def-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');

//signOutButtonElement.addEventListener('click', signOutUser);
//signInButtonElement.addEventListener('click', signIn);
