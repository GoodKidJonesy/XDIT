import { getCars, isUserSignedIn, signIn, hasActiveCar } from './fireFunctions'

//calculates the spherical distance between two lon-lat coordinate sets
function haversine(lon1, lat1, lon2, lat2) {
    // haversine formula, see https://www.movable-type.co.uk/scripts/latlong.html
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * 6371; //earth radius in km
}

function getUserLocation() {
    //https://www.w3schools.com/html/html5_geolocation.asp
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(loadCars, loadCars);
    } else {
        loadCars('-'); //if geolocation not supported
    }
}

async function loadCars(position) {
    let cars = await getCars();
    if (position.coords != undefined) {
        for (let i = 0; i < cars.length; i++) {
            cars[i].dist = haversine(position.coords.longitude, position.coords.latitude, cars[i].lon, cars[i].lat);
        }
        cars.sort((a, b) => { return a.dist - b.dist });
    }
    else {
        for (let i = 0; i < cars.length; i++) {
            cars[i].dist = '-';
        }
    }
    insertCars(cars);
}

function insertCars(cars) {
    const indicators = document.querySelector("#carCarousel .carousel-indicators");
    const items = document.querySelector("#carCarousel .carousel-inner");
    for (let i = 0; i < cars.length; i++) {
        //indicators
        let indicator = document.createElement("li");
        indicator.setAttribute("data-bs-target", "#carCarousel");
        indicator.setAttribute("data-bs-slide-to", i);
        if (i === 0) indicator.classList.add("active");
        indicators.appendChild(indicator);

        //carousel items
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (i === 0) item.classList.add("active");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute("src", "images/" + cars[i].model + ".jpg");
        img.setAttribute("alt", cars[i].model);
        card.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = "Afstand: " + distString(cars[i].dist);
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerHTML = "Model: " + cars[i].model + "<br />"
            + "Strøm: " + cars[i].power + "%" + "<br />"
            + "Pris: " + cars[i].price + " kr./min" + "<br />"
            + "Holder ved: " + "<br />" + cars[i].location;
        cardBody.appendChild(cardText);

        const button = document.createElement("a");
        button.classList.add("btn", "btn-primary");
        button.innerHTML = "Book";
        button.onclick = async () => { await attemptBooking(cars[i]); }
        cardBody.appendChild(button);

        card.appendChild(cardBody);
        item.appendChild(card);
        items.appendChild(item);
    }
    const title = document.querySelector("#title h1");
    title.innerHTML = "Biler i nærheden";
}

async function attemptBooking(car) {
    if (!isUserSignedIn()) {
        try {
            await signIn();
        } catch(e) {
            alert("Du skal logge ind for at booke en bil. Dette kan gøres øverst i højre hjørne.");
        }
    }
    if (await hasActiveCar()) {
        alert('Du kan kun booke én bil ad gangen. \nAfslut din nuværende booking på "Aktiv Bil" siden.');
        location.href = "userpage.html";
        return;
    }
    try {
        localStorage.setItem("chosenCar", JSON.stringify(car));
        location.href = "card.html";
    } catch (e) {
        alert("Du skal være logget ind for at booke en bil.");
    }
}

function distString(dist) {
    if (isNaN(dist)) return '-';
    return dist < 2 ? Math.round(dist * 1000) + " m" : Math.round(dist * 10) / 10 + " km";
}

function orderInit() {
    getUserLocation();
}

export { orderInit };