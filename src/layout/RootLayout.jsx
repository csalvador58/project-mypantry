import { Outlet } from 'react-router-dom';
import NavAppBar from '../components/NavAppBar';

export default function RootLayout() {
  return (
    <>
      <NavAppBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
