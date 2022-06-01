import { bookCar } from "./fireFunctions";

const accept = document.getElementById("accept");

async function startBooking() {
    let car = JSON.parse(localStorage.getItem("chosenCar"));
    await bookCar(car);
    setTimeout(() => {
        location.href = "userpage.html";
    }, 3000)
}


function cardInit() {
    accept.addEventListener("click", startBooking);
}

export { cardInit };
