import { render, screen, waitFor } from '@testing-library/react';
import { WeatherDisplayWrapper } from './WeatherDisplayWrapper';
import { WeatherDisplay } from './WeatherDisplay';
import { useWeatherByLocation } from '../hooks/useWeatherByLocation';

jest.mock('../hooks/useWeatherByLocation', () => ({
  useWeatherByLocation: jest.fn(),
}));
jest.mock('./WeatherDisplay');

describe('WeatherDisplayWrapper', () => {
  const renderWithContext = (
    weatherMock: {
      city: { name: string };
      list: {
        dt: number;
        main: { temp: number; humidity: number };
        weather: { description: string; icon: string }[];
      }[];
    } | null,
    isLoading: boolean,
    isError: boolean,
  ) => {
    (useWeatherByLocation as jest.Mock).mockReturnValue({
      weather: weatherMock,
      isLoading,
      isError,
      refreshWeather: jest.fn(),
    });

    render(<WeatherDisplayWrapper />);
  };

  it('should display a loader when data is loading', () => {
    renderWithContext(null, true, false);

    expect(screen.getByRole('status')).toBeInTheDocument(); // Assuming the loader has role="status"
  });

  it('should display an error message when there is an error', () => {
    renderWithContext(null, false, true);

    expect(
      screen.getByText(/There was an error while trying to fetch the data/i),
    ).toBeInTheDocument();
  });

  it('should display weather data when loading is complete', async () => {
    const mockWeather = {
      city: { name: 'London' },
      list: [
        {
          dt: 1637184000,
          main: { temp: 15.5, humidity: 75 },
          weather: [{ description: 'Clear sky', icon: '01d' }],
        },
      ],
    };

    renderWithContext(mockWeather, false, false);

    expect(screen.getByText('London')).toBeInTheDocument();

    await waitFor(() =>
      expect(WeatherDisplay).toHaveBeenCalledWith(
        { dayIndex: 0, weather: mockWeather.list },
        expect.anything(),
      ),
    );
  });
});
