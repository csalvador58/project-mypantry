import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import NavAppBar from '../components/NavAppBar';

export default function RootLayout() {
  return (
    <>
      <NavAppBar title='MyPantry' />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
