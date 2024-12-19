import { FC, useId } from 'react';
import {
  WeatherData,
  WeatherMain,
} from '../types/weatherApi';
import { getNextDates } from '../helpers/converters';
import { WeatherIcon } from './WeatherIcon';

const weatherDetailsParams = ['feels_like', 'humidity', 'temp_max', 'temp_min'];
const unitsIcons = ['°C', '%', '°C', '°C'];

export const WeatherDetail: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div>
      <strong>{label.replace('_', ' ').replace('temp', '')}:</strong> {value}
    </div>
  );
};

export const WeatherDetailsList: React.FC<Omit<WeatherMain, 'pressure' | 'temp'>> = (
  props,
) => {
  const id = useId();

  return (
    <div>
      {weatherDetailsParams.flatMap((param, index) => (
        <WeatherDetail
          key={`${param}-${id}`}
          label={param}
          value={`${props[param as keyof typeof props]}` + unitsIcons[index]}
        />
      ))}
    </div>
  );
};

export const WeatherDisplay: FC<{
  weather: WeatherData[];
  dayIndex: number;
}> = ({ weather, dayIndex }) => {
  const date = getNextDates(5)[dayIndex];
  const chosenDay = weather[dayIndex];

  if (!chosenDay) {
    return <></>;
  }

  const { main, weather: weatherDesc } = weather[dayIndex];
  const { feels_like, humidity, temp_max, temp_min } = main;

  return (
    <div className="flex flex-row rounded-b-lg border-0 pl-2">
      <div className=" border-r-2 rounded-2xl w-fit p-2 pr-4 min-w-40">
        <div className="flex justify-center">
          <WeatherIcon iconCode={weatherDesc[0]?.icon} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-left w-full">
            {`${main?.temp.toFixed(1)}°C`}
          </p>
          <p className="text-xs text-pretty">{weatherDesc[0]?.description}</p>
        </div>
      </div>
      <div className="pl-2">
        <p>{date}</p>
        <WeatherDetailsList
          feels_like={feels_like}
          humidity={humidity}
          temp_max={temp_max}
          temp_min={temp_min}
        />
      </div>
    </div>
  );
};
