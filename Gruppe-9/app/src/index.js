import { hasActiveCar, isUserSignedIn } from "./fireFunctions";

async function checkForActive() {
    console.log("f");
    setTimeout(async () => {
        if (!isUserSignedIn()) return;
        if (await hasActiveCar()) {
            console.log("s");
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