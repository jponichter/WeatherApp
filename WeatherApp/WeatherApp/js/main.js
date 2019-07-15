let daily;
let day;
let highTemperatue;
let lowTemperature;
let daySummary;
let dayIcon;

window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/743a1f76b7b781ec1fe4859412543a96/${lat},${long}`;
            console.log(api);

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Elements from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to Celsius
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                   
                    let dropdownValue = 0;

                    daily = data.daily.data;
                    day = dropdownValue;
                    highTemperatue = daily[day].temperatureHigh;
                    lowTemperature = daily[day].temperatureLow;
                    daySummary = daily[day].summary;
                    dayIcon = daily[day].icon.replace(/-/g, "_").toUpperCase();
                    console.log(highTemperatue, lowTemperature, daySummary, dayIcon);

                });
        })
    } else {
        h1.textContent = "This is not working";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});

function selectDay() {
    let dropdownValue = document.getElementById('day-dropdown').value;

    console.log(dropdownValue, daySummary, day);
};

document.getElementById('day-dropdown').addEventListener('change', selectDay);