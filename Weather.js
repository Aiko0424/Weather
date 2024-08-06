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
        <img src="./rainy.png" alt="sunny" />
      </div>`;
  } else if (icon === "rainy") {
    return `<div>
        <img src="./rainy.png" alt="rainy" />
      </div>`;
  } else if (icon === "cloudy") {
    return `<div>
        <img src="./rainy.png" alt="cloudy" />
      </div>`;
  }
};

const isItDay = (day) => {
  if (day === "day") {
    return "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";
  } else {
    return "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";
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
