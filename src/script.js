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

let h2 = document.querySelector("#current-time");
h2.innerHTML = `${day}, ${hours}:${minutes}`;

function showCityTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let apiKey = "3e00e0e60a844404980af39d65beadda";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationTemperature);
}

function showCurrentLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "3e00e0e60a844404980af39d65beadda";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCityTemperature);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

function showTemperature(response) {
  console.log(response.data);
  let place = document.querySelector("#place");
  place.innerHTML = response.data.name + ", " + response.data.sys.country;

  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = response.data.main.temp;

  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = response.data.main.temp_max;

  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = response.data.main.temp_min;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}
