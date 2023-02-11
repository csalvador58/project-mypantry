import { render, screen, cleanup } from '@testing-library/react';
import FabAdd from '../FabAdd';

afterEach(() => {
  cleanup();
});

test('render FAB component', () => {
  render(<FabAdd />);
  const fabAddElement = screen.getByTestId('fab-add');
  expect(fabAddElement).toBeInTheDocument();
});
