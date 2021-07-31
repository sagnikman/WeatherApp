let weather = {
  apiKey: "292c0bcf8c0574c67c64743c7a6d9bfa",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=292c0bcf8c0574c67c64743c7a6d9bfa`
    ).then((response) => {
        if (!response.ok) {
          alert("No weather data found.");
          throw new Error("No weather data found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = parseInt(temp) + " °C";
    document.querySelector(".feels-like-temperature").innerText = "Feels Like: "+ parseInt(feels_like) + " °C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


document.querySelector(".search button").addEventListener("click", () =>{
    weather.search();
} );

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if(event.key=="Enter") {
        weather.search();
    }
});

weather.fetchWeather("New Delhi");