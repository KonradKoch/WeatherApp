import { render, screen } from '@testing-library/react';
import {
  WeatherDetail,
  WeatherDetailsList,
  WeatherDisplay,
} from './WeatherDisplay';



describe('WeatherDisplay component', () => {
  describe('WeatherDetail', () => {
    it('should render label and value correctly', () => {
      render(<WeatherDetail label="feels_like" value="25" />);

      const label = screen.getByText('feels like:');
      expect(label).toBeInTheDocument();

      const value = screen.getByText(/25/i);
      expect(value).toBeInTheDocument();
    });

    it('should format the label correctly (replace _ with space and remove temp)', () => {
      render(<WeatherDetail label="temp_max" value="30" />);

      const label = screen.getByText(/max/i);
      expect(label).toBeInTheDocument();

      const value = screen.getByText(/30/i);
      expect(value).toBeInTheDocument();
    });
  });
  describe('WeatherDetailsList', () => {
    it('should render the correct number of weather details', () => {
      const weatherData = {
        feels_like: 25,
        humidity: 80,
        temp_max: 30,
        temp_min: 20,
      };

      render(<WeatherDetailsList {...weatherData} />);

      const weatherDetails = screen.getAllByText(/:/);
      expect(weatherDetails).toHaveLength(4);
    });

    it('should display weather details with correct units', () => {
      const weatherData = {
        feels_like: 25,
        humidity: 80,
        temp_max: 30,
        temp_min: 20,
      };

      render(<WeatherDetailsList {...weatherData} />);

      // Check if each weather detail contains the correct unit
      expect(screen.getByText(/25°C/i)).toBeInTheDocument();
      expect(screen.getByText(/80%/i)).toBeInTheDocument();
      expect(screen.getByText(/30°C/i)).toBeInTheDocument();
      expect(screen.getByText(/20°C/i)).toBeInTheDocument();
    });
  });

  describe('WeatherDisplay', () => {
    const mockWeather = [
      {
        dt: 1637184000,
        dt_txt: '2021-11-18 15:00:00',
        main: {
          temp: 22.0,
          feels_like: 25.0,
          temp_min: 18.0,
          temp_max: 28.0,
          humidity: 70,
          pressure: 1013,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'Clear sky',
            icon: '01d',
          },
        ],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 3.5,
          deg: 180,
        },
        visibility: 10000,
        pop: 0.1,
        sys: {
          pod: 'pl',
        },
      },
    ];

    it('should render weather data for the selected day', () => {
      render(<WeatherDisplay weather={mockWeather} dayIndex={0} />);

      // Check if the temperature is rendered
      expect(screen.getByText('22.0°C')).toBeInTheDocument();

      // Check if the weather description is rendered
      expect(screen.getByText('Clear sky')).toBeInTheDocument();

      // Check if the weather details list is rendered
      expect(screen.getByText(/feels like:/i)).toBeInTheDocument();
      expect(screen.getByText(/25°C/i)).toBeInTheDocument();
      expect(screen.getByText(/humidity:/i)).toBeInTheDocument();
      expect(screen.getByText(/70%/i)).toBeInTheDocument();
    });

    it('should not render anything if no weather data is provided for the selected day', () => {
      render(<WeatherDisplay weather={[]} dayIndex={0} />);

      // WeatherDisplay should not render anything if no data is present
      expect(screen.queryByText(/°C/)).toBeNull();
      expect(screen.queryByText(/Clear sky/)).toBeNull();
    });
  });
});
