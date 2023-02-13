import { render, screen, cleanup } from '@testing-library/react';
import BottomNav from '../BottomNav';

afterEach(() => {
  cleanup();
});

test('render bottom navigation', () => {
  render(<BottomNav />);
  const bottomNavElement = screen.getByTestId('bottom-nav');
  expect(bottomNavElement).toBeInTheDocument();
});
