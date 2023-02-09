// import React from 'react'
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom'
// // import {BrowserRouter} from 'react-router-dom'
// import NavAppBar from './NavAppBar';

// test('renders navigation bar logo text', async () => {
//   render(<NavAppBar />);
//   const linkElement = screen.getByRole('link');

//   // verify page content for default route
//   expect(linkElement).toBeInTheDocument();

//   await userEvent.click(screen.getByRole('link'))
//   expect(linkElement).toBeInTheDocument()
// });

import { render, screen, cleanup} from '@testing-library/react'
import NavAppBar from '../NavAppBar'

afterEach(() => {
  cleanup();
})

test('render component', () => {
  const title = 'My Pantry'
  render(<NavAppBar title={title}/>);
  const navAppBarElement = screen.getByTestId('title-display');
  expect(navAppBarElement).toBeInTheDocument();
  expect(navAppBarElement).toHaveTextContent('My Pantry');
  expect(navAppBarElement).toContainHTML('</svg>');
  // Use 'not' to invert statement
  // expect(navAppBarElement).not.toContainHTML('</svg>');


  const navAppBarMobileElement = screen.getByTestId('title-display-mobile');
  expect(navAppBarMobileElement).toBeInTheDocument();
  expect(navAppBarMobileElement).toHaveTextContent('My Pantry');
});
