import axios from 'axios';
import { classifyInput } from '../helpers/classify';
import { WeatherForecast } from '../types/weatherApi';

type Coordinates = { lat: number; lon: number };

export const getCurrentLocation = async (): Promise<Coordinates> => {
  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser or disabled.');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              reject('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              reject('The request to get user location timed out.');
              break;
            default:
              reject('An unknown error occurred.');
          }
        },
      );
    }
  });

  // Extract latitude and longitude
  const { latitude: lat, longitude: lon } = position.coords;
  return { lat, lon };
};

export const getWeatherByLocation = async (): Promise<WeatherForecast> => {
  const { lat, lon } = await getCurrentLocation();
  const weatherData = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`,
  );
  return weatherData.data;
};

export const getWeatherByCity = (input: string) => {
  const classifiedInput = classifyInput(input);
  return axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${classifiedInput}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`,
  );
};
