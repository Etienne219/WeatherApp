const apiKey = "1e3233a1ac09eac97a0fc352e761bc28";
const latLiege = 50.6333;
const lonLiege = 5.56667;
const language = "fr";
const counter = 7;

const weatherUrl = `https:
//api.openweathermap.org/data/2.5/forecast?lat=${latLiege}&lon=${lonLiege}&appid=${apiKey}&cnt=${counter}&lang=${language}&units=metric`;

function fetchingDatas() {
  return fetch(weatherUrl).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then((error) => {
        console.log(error);
        throw new Error("Something went wrong - server-side");
      });
    }
  });
}

async function displayDatas() {
  const calls = (await fetchingDatas()) || [];
  const callList = calls.list;
  callList.forEach((call) => {
    const templateElement = document.importNode(
      document.querySelector("template").content,
      true
    );
    templateElement.getElementById(
      "date"
    ).textContent = `Date : ${call.dt_txt}`;
    templateElement.getElementById("maxTemp").textContent = `${Math.round(
      call.main.temp_max
    )} °C`;
    templateElement.getElementById("minTemp").textContent = `${Math.round(
      call.main.temp_min
    )} °C`;
    templateElement.getElementById(
      "image"
    ).src = `https://openweathermap.org/img/wn/${call.weather[0].icon}@2x.png`;
    templateElement.getElementById("windSpeed").textContent = `${Math.round(
      call.wind.speed * 3.6
    )} km/h`;
    templateElement.getElementById("description").textContent =
      call.weather[0].description;

    document.querySelector("main").appendChild(templateElement);
  });
}
displayDatas();
