import { render, screen, cleanup } from '@testing-library/react';
import ListData from '../ListData';

afterEach(() => {
  cleanup();
});

test('renders list section', () => {
  const listDemo = [
    { title: 'listItem1' },
    { title: 'listItem2' },
    { title: 'listItem3' },
    { title: 'listItem4' },
    { title: 'listItem5' },
  ];

  render(<ListData data={listDemo} />);
  const listDataElement = screen.getByTestId('data-list');
  expect(listDataElement).toBeInTheDocument();
});
