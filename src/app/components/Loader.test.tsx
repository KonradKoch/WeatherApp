import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader component', () => {
    it('should render the loader component', () => {
      render(<Loader />);

      const loaderElement = screen.getByRole('status');
      expect(loaderElement).toBeInTheDocument();
    });

    it('should contain the loading text for screen readers', () => {
      render(<Loader />);

      const srOnlyText = screen.getByText('Loading...');
      expect(srOnlyText).toBeInTheDocument();
      expect(srOnlyText).toHaveClass('sr-only');
    });
  });