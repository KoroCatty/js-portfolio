
let weather = {
  apiKey: "8e4fc9f3880185d2f8eddbf8362fb788",// My API key

  fetchWeather: function (city) {
    // to obtain the metric(temp etc)
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q="
      + city
      + "&units=metric&appid="
      + this.apiKey
    )
      // once you got the above the info,  this will execute
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { feels_like } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);

    // to display the info on the page
    document.querySelector(".city").innerText = "Weather in " + name;
    // const aaa = name;
    // aaa.style.color ="red";

    // サイトからアイコンの取得 01d～04dのどれか
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;

    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".feels_like").innerText = "体感温度: " + feels_like + "°C";

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";

    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";


    // DOMを取得後スタイル付け
    const bg = document.querySelector(".weather");
    bg.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    // 画像サイズ調整
    bg.style.backgroundRepeat = "no-repeat";
    bg.style.backgroundSize = "cover";
  },


  search: function () {
    this.fetchWeather(document.querySelector(".card__searchBar").value);
  },
};


// Details Button 
const buttonDisplay = document.querySelector(".weather__button");
const weatherDetails = document.querySelector(".weather__details");

buttonDisplay.addEventListener("click", () => {
  // buttonDisplay.style.display = "block";
  weatherDetails.classList.toggle("active");
});



// to get the Search bar works and ignite the function for search button
document.querySelector(".search__button").addEventListener("click", function () {
  weather.search();
});

//  when an Enter key is pressed, this fires
// keyupイベントとは、キーボードのキーを離した際に発生するイベント
document.querySelector(".card__searchBar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// default city
weather.fetchWeather("Osaka");
