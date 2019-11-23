const temperatureDescription = document.querySelector(
  ".temperature-description"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");

let details;
let temperature;
let minTemperature;
let maxTemperature;

window.addEventListener("load", () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/743a1f76b7b781ec1fe4859412543a96/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          details = data;
          const { summary, icon } = details.currently;
          //Set DOM Elements from API
          maxTemperature = details.daily.data[0].temperatureMax;
          minTemperature = details.daily.data[0].temperatureMin;

          temperatureDegree.textContent =
            Math.floor((minTemperature - 32) * (5 / 9)) +
            " - " +
            Math.floor((maxTemperature - 32) * (5 / 9));
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = details.timezone;

          setDay();

          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //End preloader
          let preload = document.querySelector(".show-preloader");
          preload.classList.add("preload-finish");
        });
    });
  } else {
    h1.textContent = "This is not working";
  }
});

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

function setDay() {
  let date = new Date();

  for (i = 1; i < 8; i++) {
    date.setDate(date.getDate() + 1);
    dOfMonth = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    if (dOfMonth < 10 && month < 10) {
      document.getElementById("op" + i).textContent =
        "0" + dOfMonth + "." + "0" + month + "." + year;
    } else if (dOfMonth < 10) {
      document.getElementById("op" + i).textContent =
        "0" + dOfMonth + "." + month + "." + year;
    } else if (month < 10) {
      document.getElementById("op" + i).textContent =
        dOfMonth + "." + "0" + month + "." + year;
    } else {
      document.getElementById("op" + i).textContent =
        dOfMonth + "." + month + "." + year;
    }
  }
}

//Change temperature to Celsius on click
function degreeConverter() {
  if (temperatureSpan.textContent === "C") {
    temperatureSpan.textContent = "F";
    temperatureDegree.textContent =
      Math.floor(minTemperature) + " - " + Math.floor(maxTemperature);
  } else if (temperatureSpan.textContent === "F") {
    temperatureSpan.textContent = "C";
    temperatureDegree.textContent =
      Math.floor((minTemperature - 32) * (5 / 9)) +
      " - " +
      Math.floor((maxTemperature - 32) * (5 / 9));
  }
}
temperatureSection.addEventListener("click", degreeConverter);

//Change a day
function selectDay() {
  let day = document.getElementById("day-dropdown").value;
  let daily = details.daily.data[day];
  maxTemperature = daily.temperatureMax;
  minTemperature = daily.temperatureMin;
  let daySummary = daily.summary;

  if (temperatureSpan.textContent === "F") {
    temperatureSpan.textContent = "F";
    temperatureDegree.textContent =
      Math.floor(minTemperature) + " - " + Math.floor(maxTemperature);
  } else if (temperatureSpan.textContent === "C") {
    temperatureSpan.textContent = "C";
    temperatureDegree.textContent =
      Math.floor((minTemperature - 32) * (5 / 9)) +
      " - " +
      Math.floor((maxTemperature - 32) * (5 / 9));
  }

  temperatureDescription.textContent = daySummary;

  let icon = daily.icon;
  setIcons(icon, document.querySelector(".icon"));
}

document.getElementById("day-dropdown").addEventListener("change", selectDay);
