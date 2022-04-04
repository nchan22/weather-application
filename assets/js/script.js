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
