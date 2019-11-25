document.addEventListener("DOMContentLoaded", function () {

    let id = 0;
    const key = "6435a094b1838feb1771367559ced5f4";

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

    function getWeather(cityName) {

        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${key}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    document.querySelector('.search').addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = document.getElementById("city").value;
        console.log(cityName);
        getWeather(cityName);
    });
    


})