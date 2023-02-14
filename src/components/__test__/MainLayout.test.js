import { render, screen, cleanup } from '@testing-library/react';
import MainLayout from '../../layout/MainLayout';

afterEach(() => {
  cleanup();
});

test('renders the main layout section', () => {
  const propHeaderInput = 'PANTRY';
  const propList = [
    { title: 'listItem1' },
    { title: 'listItem2' },
    { title: 'listItem3' },
    { title: 'listItem4' },
    { title: 'listItem5' },
    { title: 'listItem6' },
    { title: 'listItem7' },
    { title: 'listItem8' },
    { title: 'listItem9' },
  ];
  render(<MainLayout header={propHeaderInput} listItems={propList} />);
  const mainLayoutElement = screen.getByTestId('main-section');
  const searchElement = screen.getByTestId('search-input');
  const listElement = screen.getByTestId('list');
  expect(mainLayoutElement).toBeInTheDocument();
  expect(mainLayoutElement).toHaveTextContent('PANTRY');
  expect(mainLayoutElement).toContainElement(searchElement);
  expect(mainLayoutElement).toContainElement(listElement);
});
