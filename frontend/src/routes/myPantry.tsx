import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';
// import HomePage from 'src/pages';
const HomePage = lazy(() => import('src/pages/index'));

// Pantry
const PantryListPage = lazy(() => import('src/pages/myPantry/list'));
const PantryDetailPage = lazy(() => import('src/pages/myPantry/detail'));
const PantryEditPage = lazy(() => import('src/pages/myPantry/edit'));
const PantryAddPage = lazy(() => import('src/pages/myPantry/add'));

export const myPantryRoutes: RouteObject[] = [
  {
    path: 'myPantry',
    element: (
      // <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      // </DashboardLayout>
    ),
    children: [
      {
        index: true,
        //   element: <HomePage />,
        element: <PantryListPage />,
      },
      {
        path: ':pantryId',
        element: <PantryDetailPage />,
      },
      {
        path: ':pantryId/edit',
        element: <PantryEditPage />,
      },
      {
        path: 'add',
        children: [
          {
            index: true,
            element: <PantryAddPage />,
          },
        ],
      },
    ],
  },
];
