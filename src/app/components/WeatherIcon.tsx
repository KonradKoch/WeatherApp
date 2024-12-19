import Image from 'next/image';
import { FC } from 'react';

export const WeatherIcon: FC<{ iconCode: string }> = ({ iconCode }) => {
  return (
    <Image
      alt="weather-image"
      src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
      width={70}
      height={70}
    />
  );
};
