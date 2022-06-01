import { endBooking, getBooking, hasActiveCar, isUserSignedIn, signIn } from "./fireFunctions";

var endButton = document.getElementById("betal");
var title = document.querySelector("#minebilertekst h1");
var bookingTime;
var bookingPrice;
const timer = document.createElement("p");
const bill = document.createElement("p");

async function endAndPay() {
    await endBooking();
    alert("Betaling modtaget: " + bill.innerHTML);
    location.href = "index.html";
}

async function showCar() {
    const booking = await getBooking();
    bookingTime = booking.time.toDate().getTime();
    bookingPrice = booking.price;
    const box = document.getElementById("aktivbil");
    const card = document.createElement("div");
    card.classList.add("card");
    card.style = "width: 18rem";

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = booking.model;
    card.appendChild(cardTitle);

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = "images/" + booking.model + ".jpg";
    img.alt = booking.model;
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const location = document.createElement("div");
    location.id = "location";

    const hv = document.createElement("h6");
    hv.classList.add("card-text");
    hv.innerHTML = "Hentes ved:";
    location.appendChild(hv);

    const parked = document.createElement("p");
    parked.classList.add("card-text");
    parked.innerHTML = booking.location;
    location.appendChild(parked);
    cardBody.appendChild(location);

    const time = document.createElement("div");
    time.id = "time";
    const bi = document.createElement("h6");
    bi.classList.add("card-text");
    bi.innerHTML = "Booket i:"
    time.appendChild(bi);
    timer.classList.add("card-text"); //timer (and bill) must be global to live update
    time.appendChild(timer);
    cardBody.appendChild(time);

    const price = document.createElement("div");
    bill.classList.add("card-text");
    price.id = "price";
    price.appendChild(bill);
    cardBody.appendChild(price);
    card.appendChild(cardBody);
    box.appendChild(card);
}

async function update() {
    if (!isUserSignedIn()) {
        try {
            await signIn();
        } catch (e) {
            alert("Du skal logge ind for at bruge denne side.\n"+
            "Din browser har muligvis blokeret for login pop-ups. " + 
            "Du kan logge ind manuelt med brugerikonet i øverste højre hjørne");
            location.href = "index.html";
        }
    }
    if (await hasActiveCar()) {
        let x;
        endButton.addEventListener('click', () => { clearInterval(x); endAndPay(); });
        await showCar();
        x = setInterval(taketime, 1000);
    } else {
        endButton.innerHTML = "Find biler";
        endButton.addEventListener('click', () => location.href = "order.html");
        title.innerHTML = "Du har ikke booket nogen biler";
    }
    title.removeAttribute("hidden");
    endButton.removeAttribute("hidden");
}

//https://www.w3schools.com/howto/howto_js_countdown.asp
function taketime() {
    var now = new Date().getTime();

    var distance = now - bookingTime;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);


    timer.innerHTML = days + "d " + hours + "t "
        + minutes + "m " + seconds + "s ";
    bill.innerHTML = Math.round(Math.floor(distance / 600) * bookingPrice) / 100 + "kr.";
}

function userpageInit() {
    setTimeout(() => {
        update();
    }, 1000);
}

export { userpageInit };