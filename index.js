let today = new Date();

function showDate(today) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Julay",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[today.getMonth()];
  let date = today.getDate();
  
  return `${month} ${date}`;
}

let currentDate = document.querySelector(".show-date");
currentDate.innerHTML = showDate(today);

function showTime(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[today.getDay()];
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}  ${hours}:${minutes}`;
}
let currentTime = document.querySelector(".show-time");
currentTime.innerHTML = showTime(today);

function cinvertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5 )/ 9);
  let feelsLikeCity = document.querySelector("#feels-like");
}
let celsiusLink = document.querySelector(".toCelsius");
celsiusLink.addEventListener("click", cinvertToCelsius);

function cinvertToFahrenhied(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML=Math.round((temperature * 9) / 5 + 32);
}
let fahrenhiedLink = document.querySelector(".toFahrenhied");
fahrenhiedLink.addEventListener("click", cinvertToFahrenhied);

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function searchcity(city) {
  let apiKey = "acdaa1d1ec6443cf92bb2870ded45a60";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event){
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchcity(city);
}
let searchCity = document.querySelector(".search-form");
searchCity.addEventListener("submit", handleSearch);

function showcurrentLocation(position) {
  let apiKey = "acdaa1d1ec6443cf92bb2870ded45a60";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showcurrentLocation);
}
let currentButton = document.querySelector("#current-temperature");
currentButton.addEventListener("click", getCurrentPosition);
searchcity("stockholm");