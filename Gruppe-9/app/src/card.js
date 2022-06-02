import { doc } from 'firebase/firestore';
import { bookCar } from './fireFunctions';

const accept = document.getElementById('submit');

function startBooking() {

    updatePopup(valid());

    if (valid() === true) {
        bookACar();
    }
}

function updatePopup(result) {
    if (result === true) {
        document.querySelector("#overskrift h5").innerHTML = "Tak for at køre med os!";
        document.querySelector("#info p").innerHTML = "Du kan finde din bil og afslutte booking på \"Aktiv Bil\" siden, når du er færdig med at køre.";
        document.querySelector("#info i").innerHTML = "Du bliver videresendt om få sekunder...";
    } else {
        document.querySelector("#overskrift h5").innerHTML = "Ups!";
        document.querySelector("#info p").innerHTML = "Du mangler at udfylde et felt";
        document.querySelector("#info i").innerHTML = "";
    }
}

async function bookACar() {
    let car = JSON.parse(localStorage.getItem('chosenCar'));
    await bookCar(car);
    setTimeout(() => {
        location.href = 'userpage.html';
    }, 3000)
}

function values() {
    let fornavn = document.getElementById('fornavn-input').value;
    let mellemnavn = document.getElementById('mellemnavn-input').value;
    let efternavn = document.getElementById('efternavn-input').value;
    let korekort = document.getElementById('korekort-input').value;
    let email = document.getElementById('email-input').value;
    let adresse = document.getElementById('adresse-input').value;
    let kortnavn = document.getElementById('kortnavn-input').value;
    let kortnummer = document.getElementById('kortnummer-input').value;
    let udlobsdato = document.getElementById('udlobsdato-input').value;
    let cvv = document.getElementById('cvv-input').value;

    return [fornavn, mellemnavn, efternavn, korekort, email, adresse, kortnavn, kortnummer, udlobsdato, cvv];
}

function valid() {
    let result = true;

    let checkbox = document.getElementById('exampleCheck1');

    for (let i = 0; i < values().length; i++) {
        if (values()[i] == '') result = false;
    }

    if (checkbox.checked === false) result = false;

    return result;
}

function cardInit() {
    accept.addEventListener('click', startBooking);
}

export { cardInit };