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
    const { temp, feels_like, humidity ,temp_min, temp_max} = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = parseInt(temp) + " °C";
    document.querySelector(".feels-like-temperature").innerText = "Feels Like: "+ parseInt(feels_like) + " °C";
    document.querySelector(".min").innerText="Min: " + parseInt(temp_min) + " °C";
    document.querySelector(".max").innerText="Max: " + parseInt(temp_max) + " °C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
      document.querySelector(".cloudiness").innerText =
      "Cloudiness: " + all + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

let geocode = {
  reverseGeocode: function (latitude,longitude) {
    var api_key = '61fa9bf1a24d4f2cb1d953b919b22892';

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';


  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
  
    if (request.status === 200){ 
    
      var data = JSON.parse(request.responseText);
       // data.results[0].components.city gives the city name
      weather.fetchWeather(data.results[0].components.city);
    } else if (request.status <= 500){ 
                           
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    console.log("unable to connect to server");        
  };

  request.send();
  },

getLocation: function() {
  function success(data) {
    geocode.reverseGeocode(data.coords.latitude,data.coords.longitude)
  }
  if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, console.error);
  }
  else {
    weather.fetchWeather("New Delhi");
  }
}

};

document.querySelector(".search button").addEventListener("click", () =>{
    weather.search();
} );

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if(event.key=="Enter") {
        weather.search();
    }
});

geocode.getLocation();