import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn src link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
