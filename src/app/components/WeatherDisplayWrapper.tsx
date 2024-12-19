import { useContext } from 'react';
import { useWeatherByLocation } from '../hooks/useWeatherByLocation';
import { WeatherDisplay } from './WeatherDisplay';
import { DayContext } from '../context/context';
import { Loader } from './Loader';

export const WeatherDisplayWrapper = () => {
  const { weather, isLoading, isError } = useWeatherByLocation();
  const context = useContext(DayContext);

  const weatherList = weather?.list ?? [];
  return (
    <div className="w-full flex justify-center">
      {isError && 'There was an error while trying to fetch the data. :('}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-w-96">
          <p className="px-5 text-xl">{weather?.city.name}</p>
          <WeatherDisplay
            dayIndex={context?.dayIndex ?? 0}
            weather={weatherList}
          />
        </div>
      )}
    </div>
  );
};
