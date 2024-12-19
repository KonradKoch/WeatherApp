import useSWR from 'swr';
import { getWeatherByLocation } from '../requests/getWeather';
import { WeatherForecast } from '../types/weatherApi';

export const useWeatherByLocation = () => {
  const { data, error, isLoading, mutate } = useSWR<WeatherForecast>(
    'weather-by-location',
    async () => await getWeatherByLocation(),
    {
      revalidateOnFocus: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      suspense: false,
    },
  );

  return {
    weather: data,
    isLoading,
    isError: !!error,
    refreshWeather: mutate, // Expose mutate for manual revalidation
  };
};
