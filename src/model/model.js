import { readFileSync } from "node:fs";

const PATH = "../database/db.json";

const getDataWeather = () => {
  const bufferData = readFileSync(PATH);
  const parsedData = JSON.parse(bufferData);
//   console.log(parsedData); // prueba data
  return parsedData;
};

function getHourlyTemperatureAndHumidity() {
    const weatherData = getDataWeather();
    // console.log(weatherData);
    if (!weatherData || !weatherData.timelines || !weatherData.timelines.hourly) {
        return false
    }

    return weatherData.timelines.hourly.map(timeline => ({
        time: timeline.time,
        humidity: timeline.values.humidity,
        temperature: timeline.values.temperature
    }));
}

const probarFuncion = getHourlyTemperatureAndHumidity();
console.table(probarFuncion);

