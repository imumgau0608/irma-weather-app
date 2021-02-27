let units = 'metric';
let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = '0' + minutes;
}

let h2 = document.querySelector("#current-time");
h2.innerHTML = `${day}, ${hours}:${minutes}`;

function showCityTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let apiKey = "3e00e0e60a844404980af39d65beadda";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=${units}`;
  axios.get(`${forecastURL}&appid=${apiKey}`).then(showForecast);
}

function loadDefaultCity() {
  let apiKey = "3e00e0e60a844404980af39d65beadda";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=${units}`;
  axios.get(`${forecastURL}&appid=${apiKey}`).then(showForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationTemperature);
}

function showCurrentLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3e00e0e60a844404980af39d65beadda";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCityTemperature);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

let changeTemp = document.querySelector("#change-temperature-unit");
changeTemp.addEventListener("click", changeTemperatureUnit);

function changeTemperatureUnit(event) {
  event.preventDefault();

  let changeTemp = document.querySelector("#change-temperature-unit");
  if (units == 'imperial') {
    changeTemp.innerHTML = '°F';
    units = 'metric';
  } else {
    changeTemp.innerHTML = '°C';
    units = 'imperial';
  }
  showCityTemperature(event)
}

function showTemperature(response) {
  if (units == 'imperial') {
    displayTemp = 'F';
    displaySpeed = 'f/s'
  } else {
    displayTemp = 'C';
    displaySpeed = 'm/s';
  }

  let place = document.querySelector("#place");
  place.innerHTML = response.data.name + ", " + response.data.sys.country;

  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = response.data.main.temp + '°' + displayTemp;

  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = response.data.main.temp_max + '°' + displayTemp;

  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = response.data.main.temp_min + '°' + displayTemp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity + '%';

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed + ' ' + displaySpeed;

  let weatherCondition = document.querySelector("#weather-condition");
  weatherCondition.innerHTML = response.data.weather[0].main + "<br />"
    + '<img src="http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png" />';

  let sunrise = document.querySelector("#sunrise");
  sunriseDate = new Date(response.data.sys.sunrise * 1000);
  let sunriseHours = sunriseDate.getHours();
  let sunriseMinutes = sunriseDate.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = '0' + sunriseMinutes;
  }
  sunrise.innerHTML = `${sunriseHours}:${sunriseMinutes}`;

  let sunset = document.querySelector("#sunset");
  sunsetDate = new Date(response.data.sys.sunset * 1000);
  let sunsetHours = sunsetDate.getHours();
  let sunsetMinutes = sunsetDate.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = '0' + sunsetMinutes;
  }
  sunset.innerHTML = `${sunsetHours}:${sunsetMinutes}`;

  let container = document.querySelector(".container");
  if (now.getTime() > response.data.sys.sunrise * 1000 && now.getTime() < response.data.sys.sunset * 1000) {
    container.classList.add("day");
    container.classList.remove("night");
  } else {
    container.classList.add("night");
    container.classList.remove("day");
  }
}

function showForecast(response) {
  if (units == 'imperial') {
    displayTemp = 'F';
  } else {
    displayTemp = 'C';
  }

  let forecast1 = document.querySelector("#forecast1");
  forecast1Date = new Date(response.data.list[0].dt * 1000);
  let forecast1Hours = forecast1Date.getHours();
  let forecast1Minutes = forecast1Date.getMinutes();
  if (forecast1Minutes < 10) {
    forecast1Minutes = '0' + forecast1Minutes;
  }
  forecast1.innerHTML = `${forecast1Hours}:${forecast1Minutes} <br />` + response.data.list[0].main.temp + '°' + displayTemp;

  let forecast2 = document.querySelector("#forecast2");
  forecast2Date = new Date(response.data.list[1].dt * 1000);
  let forecast2Hours = forecast2Date.getHours();
  let forecast2Minutes = forecast2Date.getMinutes();
  if (forecast1Minutes < 10) {
    forecast2Minutes = '0' + forecast2Minutes;
  }
  forecast2.innerHTML = `${forecast2Hours}:${forecast2Minutes} <br />` + response.data.list[1].main.temp + '°' + displayTemp;

  let forecast3 = document.querySelector("#forecast3");
  forecast3Date = new Date(response.data.list[2].dt * 1000);
  let forecast3Hours = forecast3Date.getHours();
  let forecast3Minutes = forecast3Date.getMinutes();
  if (forecast3Minutes < 10) {
    forecast3Minutes = '0' + forecast3Minutes;
  }
  forecast3.innerHTML = `${forecast3Hours}:${forecast3Minutes} <br />` + response.data.list[2].main.temp + '°' + displayTemp;

  let forecast4 = document.querySelector("#forecast4");
  forecast4Date = new Date(response.data.list[3].dt * 1000);
  let forecast4Hours = forecast4Date.getHours();
  let forecast4Minutes = forecast4Date.getMinutes();
  if (forecast4Minutes < 10) {
    forecast4Minutes = '0' + forecast4Minutes;
  }
  forecast4.innerHTML = `${forecast4Hours}:${forecast4Minutes} <br />` + response.data.list[3].main.temp + '°' + displayTemp;

  let forecast5 = document.querySelector("#forecast5");
  forecast5Date = new Date(response.data.list[4].dt * 1000);
  let forecast5Hours = forecast5Date.getHours();
  let forecast5Minutes = forecast5Date.getMinutes();
  if (forecast5Minutes < 10) {
    forecast5Minutes = '0' + forecast5Minutes;
  }
  forecast5.innerHTML = `${forecast5Hours}:${forecast5Minutes} <br />` + response.data.list[4].main.temp + '°' + displayTemp;
}

loadDefaultCity();
