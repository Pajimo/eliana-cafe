import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import HomePage from './components/myCafe/homepage';
import { app } from './configuration/firebaseConfig';
import { authMock } from './setupTests';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
app
describe('App', () => {
  it('Renderng app component', () => {
    render(<HomePage />)
  })
})
