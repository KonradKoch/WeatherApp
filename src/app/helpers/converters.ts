export const fahrenheitToCelsius = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const getNextDates = (
  days: number,
  weekdaysOnly?: boolean,
): string[] => {
  const today = new Date();
  const dates: string[] = [];

  const options: Intl.DateTimeFormatOptions = weekdaysOnly
    ? { weekday: 'short' }
    : {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };

  for (let i = 0; i < days; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate.toLocaleDateString('en-US', options));
  }

  return dates;
};
