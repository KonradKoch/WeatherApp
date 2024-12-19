import { render, screen } from '@testing-library/react';
import { WeatherIcon } from './WeatherIcon';

describe('WeatherIcon Component', () => {
  it('should render an image with the correct src and alt attributes', () => {
    const mockIconCode = '10d';

    render(<WeatherIcon iconCode={mockIconCode} />);

    const imageElement = screen.getByAltText('weather-image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement).toHaveAttribute('alt', 'weather-image');
  });
});
