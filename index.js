document.addEventListener("DOMContentLoaded", function () {

    let id = 0;
    const openWeatherKey = "6435a094b1838feb1771367559ced5f4";
    const newsKey = "da4b99413d7b47c8b7ce89892570c2ae";
    let currentCity = "Wroclaw";

    // function getCityId() {

    //     var cityName = document.getElementById("city").value;
    //     submitOK = "true";

    //     fetch("http://localhost:1337/citylist.json", {
    //             mode: 'no-cors'
    //         })
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             data.forEach(function (city) {
    //                 if (city.name == cityName) {
    //                     id = city.id;
    //                     console.log(id);
    //                 }
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    //     console.log(id);
    //     return id;
    // }
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
                   currentCity = data.results[0].address_components[1].short_name;
                   console.log(currentCity);
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
            });
        }
    }

    function getWeather(cityName) {
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

    function getNews() {
        var req = new Request(`https://newsapi.org/v2/top-headlines?country=pl&apiKey=${newsKey}`);
        fetch(req)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function (data) {
                        let img = document.querySelectorAll('.news');
                        img[0].children[0].setAttribute("src", data.articles[0].urlToImage);
                        img[0].children[1].setAttribute("src", data.articles[1].urlToImage);
                        img[0].children[2].setAttribute("src", data.articles[2].urlToImage);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }


    document.querySelector('.search').addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = document.getElementById("city").value;
        console.log(cityName);
        getWeather(cityName);
    });


    getCurrnetCity();

})