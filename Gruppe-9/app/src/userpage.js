import { async } from "@firebase/util";
import { endBooking, getBooking, hasActiveCar } from "./fireFunctions";

var endButton = document.getElementById("betal");
var title = document.querySelector("#minebilertekst h1");
const timer = document.createElement("p");
const bill = document.createElement("p");

async function endAndPay() {
    await endBooking();
    location.reload();
}

async function showCar() {
    const booking = await getBooking();
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
    card.appendChild("img");

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
    bi.innerHTML = "Brugt i:"
    time.appendChild(bi);
    timer.classList.add("card-text"); //timer (and bill) must be global to live update
    time.appendChild(timer);
    cardBody.appendChild(time);

    const price = document.createElement("div");
    price.id = "price";
    price.appendChild(bill);
    cardBody.appendChild(price);
    card.appendChild(cardBody);
    box.appendChild(card);
}

async function update() {
    if (await hasActiveCar()) {
        endButton.addEventListener('click', endAndPay);

    } else {
        endButton.innerHTML = "Find biler";
        endButton.addEventListener('click', () => location.href = "order.html");
        title.innerHTML = "Du har ingen aktive biler";
    }
}

//https://www.w3schools.com/howto/howto_js_countdown.asp
function taketime() {
    var now = new Date().getTime();

    var distance = now - countDownDate;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
}

function userpageInit() {
    setTimeout(() => {
        update();
    }, 1000);
    let x = setInterval(taketime, 1000);
}

export { userpageInit };