import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Saket Pokale text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Saket Pokale/i);
  expect(linkElement).toBeInTheDocument();
});
