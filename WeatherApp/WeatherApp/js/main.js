let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span')

let details;


window.addEventListener('load', () => {

    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');

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
                    details = data;
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
    let day = document.getElementById('day-dropdown').value;    
    let daily = details.daily.data;
    let highTemperature = daily[day].temperatureHigh;
    let lowTemperature = daily[day].temperatureLow;
    let daySummary = daily[day].summary;
    let dayIcon = daily[day].icon.replace(/-/g, "_").toUpperCase();
    console.log(lowTemperature, daySummary);

    temperatureDegree.textContent = lowTemperature + ' - ' + highTemperature;
    temperatureDescription.textContent = daySummary;
};

document.getElementById('day-dropdown').addEventListener('change', selectDay);

