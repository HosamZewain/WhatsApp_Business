import { render, screen } from '@testing-library/react';
import { App } from './App';

it('renders foundation status', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /whatsapp business platform/i })).toBeInTheDocument();
});
