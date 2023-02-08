import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';

const router = createBrowserRouter([
  { path: '/', element:<RootLayout /> }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
