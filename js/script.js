// api key 968f21f3c0df218e3d72d731eedcda52

// przypisanie elementów 
    let dateElement = [];
    let iconElement = [];
    let tempElement = [];
    let descElement = [];

for(let i = 0 ; i < 5 ; i++) {
    dateElement[i] = document.querySelector(`#item${i} .app-date`);
    iconElement[i] = document.querySelector(`#item${i} .weather-icon`);
    tempElement[i] = document.querySelector(`#item${i} .temperature-value p`);
    descElement[i] = document.querySelector(`#item${i} .temperature-description p`);
}

const notificationElement = document.querySelector(".notification");

const weather = {
    date : [],
    description : [],
    iconId : []
};

weather.temperature = {
    unit : "celsius",
    value : []
}

const KELVIN = 273;

// KLUCZ API
const key = '968f21f3c0df218e3d72d731eedcda52';

// GEOLOKACJA
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElemnt.style.display = "block";
    notificationElemnt.innerHTML = "<p>Przeglądarka nie wspiera geolokalizacji.</p>";
}

// LOKALIZACJA UŻYTKOWNIKA
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// BLAD
function showError(error){
    notificationElemnt.style.display = "block";
    notificationElemnt.innerHTML = `<p> ${error.message} </p>`;
}

// POBRANIE POGODY Z API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/forecast?lang=pl&lat=${latitude}&lon=${longitude}&appid=${key}`;
    let day = 0;

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        for(let i = 0 ; i < 5 ; i++){
            weather.date[i] = data.list[i*8].dt_txt; // list[0] - 1szy dzien, list[8] - 2gi dzien, list[16] - 3eci dzien, list[24],list[32]
            weather.temperature.value[i] = Math.floor(data.list[i*8].main.temp - KELVIN);
            weather.description[i] = data.list[i*8].weather[0].description;
            weather.iconId[i] = data.list[i*8].weather[0].icon;
        }
    })
    .then(function(){
        displayWeather();
    });
}
// WYSWIETLANIE
function displayWeather() {
    for(let i = 0 ; i < 5 ; i++) {
        dateElement[i].innerHTML = weather.date[i];
        iconElement[i].innerHTML = `<img src="./img/${weather.iconId[i]}.png"/>`;
        tempElement[i].innerHTML = `${weather.temperature.value[i]}°<span>C</span>`;
        descElement[i].innerHTML = weather.description[i];
    }
}