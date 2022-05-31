import { getCars } from './fireFunctions'

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
        + "Pris: " + cars[i].price + " kr./min";
        cardBody.appendChild(cardText);

        const button = document.createElement("a");
        button.classList.add("btn", "btn-primary");
        button.innerHTML = "Book";
        button.onclick = () => {console.log("hej"); location.href="card.html";}
        cardBody.appendChild(button);

        card.appendChild(cardBody);
        item.appendChild(card);
        items.appendChild(item);
    }
}

function distString(dist) {
    if (isNaN(dist)) return '-';
    return dist < 2 ? Math.round(dist * 1000) + " m" : Math.round(dist*10) / 10 + " km";
}

/*
    <div id="carCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="card">
                        <img class="card-img-top" src="images/car1.jpg" alt="First slide">
                        <div class="card-body">
                            <h5 class="card-title">Afstand: <span class="dist">-</span>m</h5>
                            <p class="card-text">Model: <span class="model">--</span>
                                <br> Strøm: <span class="power">-</span>%
                                <br> Pris: <span class="price">-</span> kr./min
                            </p>
                            <a href="card.html" class="btn btn-primary">Book</a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img class="card-img-top" src="images/car2.jpg" alt="First slide">
                        <div class="card-body">
                            <h5 class="card-title">Afstand: <span class="dist">-</span>m</h5>
                            <p class="card-text">Model: <span class="model">--</span>
                                <br> Strøm: <span class="power">-</span>%
                                <br> Pris: <span class="price">-</span> kr./min
                            </p>
                            <a href="card.html" class="btn btn-primary">Book</a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img class="card-img-top" src="images/car3.jpg" alt="First slide">
                        <div class="card-body">
                            <h5 class="card-title">Afstand: <span class="dist">-</span>m</h5>
                            <p class="card-text">Model: <span class="model">--</span>
                                <br> Strøm: <span class="power">-</span>%
                                <br> Pris: <span class="price">-</span> kr./min
                            </p>
                            <a href="card.html" class="btn btn-primary">Book</a>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Forrige</span>
            </a>
            <a class="carousel-control-next" href="#carCarousel" role="button" data-bs-slide="next">
                <span class="sr-only">Næste</span>
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
        </div>
*/

function orderInit() {
    getUserLocation();
}

export { orderInit };