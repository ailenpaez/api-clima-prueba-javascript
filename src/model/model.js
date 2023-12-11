import { readFileSync } from "node:fs";

const PATH = "../database/db.json";

const getDataWeather = () => {
  const bufferData = readFileSync(PATH);
  const parsedData = JSON.parse(bufferData);
  //   console.log(parsedData); // prueba data
  return parsedData;
};

// getHourlyTemperatureAndHumidity() =>
// DEBE RETORNAR UNA COLLECTION CON LOS SIGUIENTES OBJETOS:
// {time: '2023-07-21T14:00:00Z', humidity: 86, temperature: 13.26}.

const getHourlyTemperatureAndHumidity = () => {
  const weatherData = getDataWeather();
  // console.log(weatherData);
  if (!weatherData || !weatherData.timelines || !weatherData.timelines.hourly) {
    return false;
  }

  return weatherData.timelines.hourly.map((timeline) => ({
    time: timeline.time,
    humidity: timeline.values.humidity,
    temperature: timeline.values.temperature,
  }));
};

const probarFuncion = getHourlyTemperatureAndHumidity();
console.table(probarFuncion);

// getPressureLevelByTemperature(temperature) =>
// DEBE RETORNAR UNA COLLECTION QUE EN LA PROP 'temperature' sea >= AL VALOR 'temperature' RECIBIDO X PARÁMETRO.
// FORMATO DE LA COLLECTION:
// {pressureSurfaceLeve: 1009.62, temperature: 21.25}.

const getPressureLevelByTemperature = (temperature) => {
  const weatherData = getDataWeather();
  if (!weatherData || !weatherData.timelines || !weatherData.timelines.hourly) {
    return false;
  }

  return weatherData.timelines.hourly.filter((timeline) => timeline.values.temperature >= temperature).map((timeline) => ({
      pressureSurfaceLeve: timeline.values.pressureSurfaceLevel,
      temperature: timeline.values.temperature,
    }));
};

const tempTest = 8;
const probarPressureLevels = getPressureLevelByTemperature(tempTest);
console.table(probarPressureLevels);
