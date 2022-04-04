var searchCityEl = document.querySelector(".searchCity");
var searchBtnEl = document.querySelector(".searchBtn");
var currentWeatherEl = document.querySelector(".currentWeather");

var day1El = document.querySelector(".day-1");
var day2El = document.querySelector(".day-2");
var day3El = document.querySelector(".day-3");
var day4El = document.querySelector(".day-4");
var day5El = document.querySelector(".day-5");

var cardArray = [day1El, day2El, day3El, day4El, day5El];
var apiKey = "607439a3ad59adef49501bad43c27015";
var historyEl = document.querySelector(".history");
var clearHistoryEl = document.querySelector(".clear-history");

// saving recent search to local storage

var savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];

// saved cities

function saveRecentCities(city) {
  savedCities.push(city);
  localStorage.setItem("recentCities", JSON.stringify(savedCities));
  generateSearchHistory();
}

// showing recent searches

function generateSearchHistory() {
  historyEl.innerHTML = "";
  for (var i = 0; i < savedCities.length; i++) {
    var recentItem = document.createElement("li");
    recentItem.setAttribute("class", "col-10-m-2 btn btn-primary");
    recentItem.textContent = ("cities", savedCities[i]);
    historyEl.appendChild(recentItem);
    recentItem.addEventListener("click", function (e) {
      var city = e.target.textContent;
      searchCityEl.value = city;
      getCurrentWeather(city);
    });
  }
}

var city = function () {
  var cityName = searchCityEl.value;

  currentWeatherEl.innerHTML = "";
  getCurrentWeather(cityName);
  saveRecentCities(cityName);
};

// clear local storage

clearHistoryEl.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});

// getting and displaying current weather

var getCurrentWeather = function (city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentDate = moment().format("(MM/DD/YYYY)");
      var weatherNow = data.main.temp;
      var windSpeedNow = data.wind.speed;
      var humidityNow = data.main.humidity;
      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;

      var cityHeading = document.createElement("h2");
      cityHeading.className = "city_heading";
      cityHeading.innerHTML = city + ", " + currentDate;
      currentWeatherEl.append(cityHeading);

      var currentWeatherTemp = document.createElement("p");
      currentWeatherTemp.innerHTML = "Temp: " + weatherNow + " ℃";
      currentWeatherEl.append(currentWeatherTemp);

      var currentWeatherWind = document.createElement("p");
      currentWeatherWind.innerHTML = "Wind : " + windSpeedNow + " m/s";
      currentWeatherEl.append(currentWeatherWind);

      var currentWeatherHumidity = document.createElement("p");
      currentWeatherHumidity.innerHTML = "Humidity :" + humidityNow + " %";
      currentWeatherEl.append(currentWeatherHumidity);

      getUv(cityLon, cityLat);
      searchCityEl.value = "";
      fiveDayWeather(cityLon, cityLat);
    });
};

// uv index function

var getUv = function (lon, lat) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lon=" +
      lon +
      "&lat=" +
      lat +
      "&exclude=hourly,daily&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var weatherUv = data.current.uvi;
      var uvEl = document.createElement("p");
      uvEl.innerHTML = "UV Index: " + weatherUv;
      currentWeatherEl.append(uvEl);

      if (weatherUv >= 0 && weatherUv <= 2) {
        uvEl.style.backgroundColor = "green";
      } else if (weatherUv <= 3 && weatherUv <= 5) {
        uvEl.style.backgroundColor = "yellow";
      } else {
        uvEl.style.backgroundColor = "red";
      }
    });
};
