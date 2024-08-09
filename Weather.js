const weathers = [
  {
    city: "New York",
    temperature: 28,
    weather: "Sunny",
    icon: "sunny",
    day: "day",
    time: new Date().toLocaleTimeString("en-US"),
  },
  {
    city: "London",
    temperature: 18,
    weather: "Cloudy",
    icon: "cloudy",
    day: "night",
    time: new Date().toLocaleTimeString("en-GB"),
  },
  {
    city: "Tokyo",
    temperature: 30,
    weather: "Rainy",
    icon: "rainy",
    day: "day",
    time: new Date().toLocaleTimeString("ja-JP"),
  },
  {
    city: "Sydney",
    temperature: 22,
    weather: "Partly Cloudy",
    icon: "cloudy",
    day: "day",
    time: new Date().toLocaleTimeString("en-AU"),
  },
  {
    city: "Paris",
    temperature: 25,
    weather: "Clear",
    icon: "moon",
    day: "night",
    time: new Date().toLocaleTimeString("fr-FR"),
  },
];

const iconComponent = (icon) => {
  if (icon === "sunny") {
    return `<div>
        <img src="./rainy.png" alt="sunny" class="weather-icon"/>
      </div>`;
  } else if (icon === "rainy") {
    return `<div>
        <img src="./rainy.png" alt="rainy" class="weather-icon"/>
      </div>`;
  } else if (icon === "cloudy") {
    return `<div>
        <img src="./rainy.png" alt="cloudy" class="weather-icon"/>
      </div>`;
  }
};

const isItDay = (day) => {
  if (day === "day") {
    return "./day.jpg";
  } else {
    return "./night.jpg";
  }
};

const cardComponent = ({ city, temperature, weather, icon, day, time }) => {
  const dayOrNight = isItDay(day);

  return `<div class="weather-container" style="background-image: url(${dayOrNight});">
                    <div class="weather-inner-top">
                    <div>
                    <div class="city">${city}</div>
                    <div class="time">${time}</div>
                    </div>
                    <div class="temperature">${temperature}°</div>
                    </div>
                    <div class="weather-inner-bottom">
                    <div class="weather">${weather}</div>
                    ${iconComponent(icon)}
                    </div>
        </div>
  `;
};

const render = (data) => {
  const mainContainer = document.getElementById("weather-main-container");

  data.forEach((element) => {
    mainContainer.innerHTML += cardComponent(element);
  });
};

render(weathers);

// TODO Weather API

document.getElementById("search-input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const locationToFind = event.target.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationToFind}&units=Metric&appid=7c91776fb1267161889e298c3e7ceb4b`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const weatherResult = document.getElementById("weather-result");
        weatherResult.innerHTML = ""; // Clear previous results

        if (data.cod === 200) {
          const weatherInfo = `
            <div class="weather-info">
              <h2>${data.name}, ${data.sys.country}</h2>
              <p>Temperature: ${data.main.temp} °C</p>
              <p>Weather: ${data.weather[0].description}</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
          `;
          weatherResult.innerHTML = weatherInfo;
        } else {
          weatherResult.innerHTML =
            "<p>Location not found. Please try again.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        const weatherResult = document.getElementById("weather-result");
        weatherResult.innerHTML =
          "<p>Error fetching data. Please try again later.</p>";
      });
  }
});
