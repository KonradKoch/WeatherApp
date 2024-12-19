import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu'; // Adjust the import path if necessary
import { getNextDates } from '../helpers/converters';
import { useState } from 'react';

const nextFiveDays = getNextDates(5, true);

describe('Menu component', () => {
  const mockedMenuTabContent = nextFiveDays;
  const TestComponent = () => {
    const [dayIndex, setDayIndex] = useState(0);
    return <Menu dayIndex={dayIndex} setDayIndex={setDayIndex} />;
  };

  beforeEach(() => {
    render(<TestComponent />);
  });

  it('should render the correct number of day tabs', () => {
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements).toHaveLength(5);
  });

  it('should display today by default', () => {
    const activeTab = screen.getByText(`${mockedMenuTabContent[0]}`);
    expect(activeTab).toHaveClass('border-blue-500');
    expect(activeTab).toHaveClass('text-blue-600');
  });

  it('should apply the active styles to the selected tab', () => {
    fireEvent.click(screen.getByText(mockedMenuTabContent[2]));
    const activeTab = screen.getByText(`${mockedMenuTabContent[2]}`);
    expect(activeTab).toHaveClass('border-blue-500');
    expect(activeTab).toHaveClass('text-blue-600');
  });
});
