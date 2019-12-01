document.addEventListener("DOMContentLoaded", function () {



    //Pogoda na 5 dni w obecnej lokalizacji 

    // przypisanie elementów 
    let dateElement = [];
    let iconElement = [];
    let tempElement = [];
    let descElement = [];

    for (let i = 0; i < 5; i++) {
        dateElement[i] = document.querySelector(`#item${i} .app-date`);
        iconElement[i] = document.querySelector(`#item${i} .weather-icon`);
        tempElement[i] = document.querySelector(`#item${i} .temperature-value p`);
        descElement[i] = document.querySelector(`#item${i} .temperature-description p`);
    }

    const notificationElement = document.querySelector(".notification");

    const weather = {
        date: [],
        description: [],
        iconId: [],
        lat: 10,
        lon: 25
    };

    weather.temperature = {
        unit: "celsius",
        value: []
    }

    const KELVIN = 273;

    // KLUCZ API
    const key = '968f21f3c0df218e3d72d731eedcda52';

    // GEOLOKACJA
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        notificationElemnt.style.display = "block";
        notificationElemnt.innerHTML = "<p>Przeglądarka nie wspiera geolokalizacji.</p>";
    }

    // LOKALIZACJA UŻYTKOWNIKA
    function setPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        getWeather(latitude, longitude);
    }

    // BLAD
    function showError(error) {
        notificationElemnt.style.display = "block";
        notificationElemnt.innerHTML = `<p> ${error.message} </p>`;
    }
    // POBRANIE POGODY Z API
    function getWeather(latitude, longitude) {
        let api = `http://api.openweathermap.org/data/2.5/forecast?lang=pl&lat=${latitude}&lon=${longitude}&appid=${key}`;
        let day = 0;

        fetch(api)
            .then(function (response) {
                let data = response.json();
                return data;
            })
            .then(function (data) {
                for (let i = 0; i < 5; i++) {
                    let tempWeather = [];
                    tempWeather[i] = data.list[i * 8].dt_txt; // list[0] - 1szy dzien, list[8] - 2gi dzien, list[16] - 3eci dzien, list[24],list[32]
                    weather.date[i] = tempWeather[i].split(' '); // oddziela godzine od daty
                    weather.temperature.value[i] = Math.floor(data.list[i * 8].main.temp - KELVIN); 
                    weather.description[i] = data.list[i * 8].weather[0].description;
                    weather.iconId[i] = data.list[i * 8].weather[0].icon;
                }
            })
            .then(function () {
                displayWeather();
            });
    }
    // WYSWIETLANIE
    function displayWeather() {
        for (let i = 0; i < 5; i++) {
            dateElement[i].innerHTML = weather.date[i][0];
            iconElement[i].innerHTML = `<img src="./img/${weather.iconId[i]}.png"/>`;
            tempElement[i].innerHTML = `${weather.temperature.value[i]}°<span>C</span>`;
            descElement[i].innerHTML = weather.description[i];
        }
    }

    //TODO Wyświetlanie pogody na 5 dni z wyszukiwarki

    //TODO Wyświetlanie pogody na teraz z geolokalziacji

    //TODO Wyświetlanie pogody na teraz z wyszukiwarki


    let id = 0;
    const openWeatherKey = "6435a094b1838feb1771367559ced5f4";
    const newsKey = "da4b99413d7b47c8b7ce89892570c2ae";
    let currentCity = "Wroclaw";

    //wyszukiwanie miasta po geolokalizacji
    function getCurrnetCity() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyDjuFykfFmVZHNwMoQ2XJukoHlwCU7HJ6U";
                fetch(url)
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        response.json().then(function (data) {
                            // działa tylko na adresie githun pages ze względów bezpieczenstwa
                            // currentCity = data.results[0].address_components[1].short_name; 
                            //console.log(currentCity);
                        });
                    })
                    .catch(function (err) {
                        console.log('Fetch Error :-S', err);
                    });
            });
        }
    }

    //przykładowe temp na teraz z wyszukiwaniem miasta ( + wyświetlanie temp w konsoli)
    function getWeatherCityToday(cityName) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${openWeatherKey}&units=metric`)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data.list[0].main.temp);
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    //Pobieranie oraz wyświetlanie newsów
    function getNews() {
        var req = new Request(`https://newsapi.org/v2/top-headlines?country=pl&category=science&apiKey=${newsKey}`);
        fetch(req)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function (data) {
                        //console.log(data);

                        let link = document.querySelectorAll('.link');
                        link[0].parentElement.children[0].setAttribute("href", data.articles[0].url)
                        link[1].parentElement.children[0].setAttribute("href", data.articles[1].url)
                        link[2].parentElement.children[0].setAttribute("href", data.articles[2].url)

                        let title = document.querySelectorAll('.carousel-caption');
                        title[0].innerText = data.articles[0].title;
                        title[1].innerText = data.articles[1].title;
                        title[2].innerText = data.articles[2].title;

                        
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }



    //EventListner dla wyszukiwania miasta
    function searchBox(){
    document.querySelector('.search-box').addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = document.getElementById("searchResultCity").value;
        console.log(cityName);//przykład
        getWeatherCityToday(cityName); //przykład
        console.log(weather.lat, weather.lon)
        //getWeather(weather.lat, weather.lon);
        
        //getWeather(50, 50);
    });}

    //Temperatura teraz
    function tempCityNow(){
        getCurrnetCity();
        let api2 = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&APPID=${openWeatherKey}&units=metric`;
        fetch(api2)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    let temp = document.querySelector('.geo-btn');
                    temp.innerText = `${currentCity} ${data.list[0].main.temp}°C`
                    weather.lat = data.city.coord.lat;
                    weather.lon = data.city.coord.lon;
                    console.log(weather.lat ,weather.lon)
                    //console.log(data.list[0].main.temp);
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    tempCityNow();
    searchBox();
    getNews();






})