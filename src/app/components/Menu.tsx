import { getNextDates } from '../helpers/converters';
import { FC } from 'react';
import { DayContextProps } from '../context/context';

export const Menu: FC<DayContextProps> = ({ dayIndex, setDayIndex }) => {
  const onTabClick = (value: number) => {
    setDayIndex(value);
  };

  const days = getNextDates(5, true);
  return (
    <div className="text-center border-b border-gray-200 dark:border-gray-700 mb-10">
      <ul
        className="flex -mb-px justify-around"
        id="weather-days-tabs"
        role="tablist"
      >
        {days.flatMap((day, index) => (
          <li className="w-full" key={day}>
            <button
              onClick={() => onTabClick(index)}
              className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${
                index === dayIndex
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              id={`tab-${index}`}
              type="button"
              role="tab"
              aria-controls={`content-${index}`}
              aria-selected={index === dayIndex}
            >
              {day}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
