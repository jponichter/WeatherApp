let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span')

let details;
let temperature;
let minTemperature;
let maxTemperature;


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

                    details = data;
                    const { summary, icon } = details.currently;
                    //Set DOM Elements from API
                    maxTemperature = details.daily.data[0].temperatureMax;
                    minTemperature = details.daily.data[0].temperatureMin;

                    temperatureDegree.textContent = Math.floor((minTemperature - 32) * (5 / 9)) + ' - ' + Math.floor((maxTemperature - 32) * (5 / 9));
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = details.timezone;

                    

                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));
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



//Change temperature to Celsius
function degreeConverter() {
    if (temperatureSpan.textContent === "C") {
        temperatureSpan.textContent = "F";
        temperatureDegree.textContent = minTemperature + ' - ' + maxTemperature;
    } else if (temperatureSpan.textContent === "F"){
        temperatureSpan.textContent = "C";
        temperatureDegree.textContent = Math.floor((minTemperature - 32) * (5 / 9)) + ' - ' + Math.floor((maxTemperature - 32) * (5 / 9));
    }
}
temperatureSection.addEventListener('click', degreeConverter);


function selectDay() {
    let day = document.getElementById('day-dropdown').value;    
    let daily = details.daily.data[day];
    maxTemperature = daily.temperatureMax;
    minTemperature = daily.temperatureMin;
    let daySummary = daily.summary;
    let dayIcon = daily.icon.replace(/-/g, "_").toUpperCase();
    console.log(minTemperature, daySummary);

    if (temperatureSpan.textContent === "F") {
        temperatureSpan.textContent = "F";
        temperatureDegree.textContent = minTemperature + ' - ' + maxTemperature;
    } else if (temperatureSpan.textContent === "C") {
        temperatureSpan.textContent = "C";
        temperatureDegree.textContent = Math.floor((minTemperature - 32) * (5 / 9)) + ' - ' + Math.floor((maxTemperature - 32) * (5 / 9));
    }
    //temperatureDegree.textContent = Math.floor((minTemperature - 32) * (5 / 9)) + ' - ' + Math.floor((maxTemperature - 32) * (5 / 9));
    temperatureDescription.textContent = daySummary;
};

document.getElementById('day-dropdown').addEventListener('change', selectDay);

