//Display Current Time
function formatDate(timestamp) {
  let currentTime = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentTime.getDay()]; //índice do dia da semana
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = currentTime.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  return `${day}, ${hour}:${min}`;
}

//Show temperature with current location
function displayWeather(response) {
  let dateElement = document.querySelector("#display-date");
  let currentTime = new Date();
  let iconElement = document.querySelector("#icon");

  document.querySelector("#show-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#show-humidity").innerHTML = ` ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#show-wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//Display weather of searched city
function searchCity(city) {
  let apiKey = "62c0de0f03a654039e2827dd4c7641ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Conversion
function showTemperatureCelsius() {
  event.preventDefault();
  let showTemperature = document.querySelector("#show-temperature");
  let temperature = showTemperature.innerHTML;
  temperature = Number(temperature);
  showTemperature.innerHTML = Math.round((temperature - 32) * (5 / 9));
}
function showTemperatureFahrenheit() {
  event.preventDefault();
  let showTemperature = document.querySelector("#show-temperature");
  let temperature = showTemperature.innerHTML;
  temperature = Number(temperature);
  showTemperature.innerHTML = Math.round(temperature * 1.8 + 32);
}

let temperatureCelsius = document.querySelector("#celsius-temperature");
let temperatureFahrenheit = document.querySelector("#fahrenheit-temperature");

temperatureCelsius.addEventListener("click", showTemperatureCelsius);
temperatureFahrenheit.addEventListener("click", showTemperatureFahrenheit);

function handlePosition(position) {
  let apiKey = "62c0de0f03a654039e2827dd4c7641ef";

  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function activeLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let getLocation = document.querySelector("button");
getLocation.addEventListener("click", activeLocation);

searchCity("Porto");
