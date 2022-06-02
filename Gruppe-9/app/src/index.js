import { hasActiveCar, isUserSignedIn } from "./fireFunctions";

async function checkForActive() {
    setTimeout(async () => {
        if (!isUserSignedIn()) return;
        if (await hasActiveCar()) {
            document.getElementById("endBooking").removeAttribute("hidden");
            document.querySelector("button").style = "margin: 0px";
            document.getElementById("help").style = "margin-top: auto";
        }
    }, 1000);
}

function indexInit() {
    checkForActive();
}

export { indexInit };