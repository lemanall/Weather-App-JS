// const weather = {
//   apiKey: "5c1e801a98de55b805c069472e3bdc3a",
//   fetchWeather: (city) => {
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
//     )
//       .then((res) => res.json())
//       .then((data) => displayWeather(data));
//   },
//   displayWeather: function (data) {
//     const { name } = data;
//     const { icon, description } = data.weather;
//     const { temp, humidity } = data.main;
//     const { speed } = data.wind;

//     console.log(name, icon, description, temp, humidity, speed);
//   },
// };

// weather.fetchWeather();

class Weather {
  apiKey = "5c1e801a98de55b805c069472e3bdc3a";

  fetchWeather = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    );

    const data = await res.json();

    console.log(data);

    this.displayWeather(data);
  };

  displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;

    document.querySelector(".weather").classList.remove("loading");

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  };

  search = () => {
    this.fetchWeather(document.querySelector(".search-bar").value);
    document.querySelector(".search-bar").value = "";
  };
}

const weather = new Weather();

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Denver");
