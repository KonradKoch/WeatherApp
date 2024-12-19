import { render, screen, fireEvent } from '@testing-library/react';
import Layout from './Layout';
import { useContext } from 'react';
import { DayContext } from '../context/context';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({ className: 'inter-font' })),
}));

describe('Layout component', () => {
  it('should render without crashing', () => {
    console.log(Layout);
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should update the dayIndex in the context when the button is clicked', () => {
    const TestComponent = () => {
      const { dayIndex, setDayIndex } = useContext(DayContext)!;

      return (
        <div>
          <p>Day Index: {dayIndex}</p>
          <button onClick={() => setDayIndex(2)}>Update Day Index</button>
          <button onClick={() => setDayIndex(1)}>Set Day to 1</button>
        </div>
      );
    };
    render(
      <Layout>
        <TestComponent />
      </Layout>,
    );

    expect(screen.getByText('Day Index: 0')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Update Day Index'));
    expect(screen.getByText('Day Index: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set Day to 1'));
    expect(screen.getByText('Day Index: 1')).toBeInTheDocument();
  });
});
