import { render, screen, cleanup } from '@testing-library/react';
import MainLayout from '../../layout/MainLayout';

afterEach(() => {
  cleanup();
});

test('renders the main layout section', () => {
  const propHeaderInput = 'PANTRY';
  const propList = [];
  render(<MainLayout header={propHeaderInput} listItems={propList} />);
  const mainLayoutElement = screen.getByTestId('main-section');
  const searchElement = screen.getByTestId('search-input');
  const listElement = screen.getByTestId('list');
  expect(mainLayoutElement).toBeInTheDocument();
  expect(mainLayoutElement).toHaveTextContent('PANTRY');
  expect(mainLayoutElement).toContainElement(searchElement);
  expect(mainLayoutElement).toContainElement(listElement);
});
