import { async } from "@firebase/util";
import { endBooking } from "./fireFunctions";

var endButton = document.getElementById("betal");

async function endAndPay() {
    await endBooking();
    location.reload();
}

function userpageInit() {
    endButton.addEventListener('click', endAndPay);
}

export { userpageInit };