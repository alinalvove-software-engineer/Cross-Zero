import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tic Tac Toe/i);
  expect(linkElement).toBeInTheDocument();
});
