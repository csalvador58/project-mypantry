import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { authRoutes } from './auth';
import { myPantryRoutes } from './myPantry';
// import HomePage from 'src/pages';
const HomePage = lazy(() => import('src/pages/index'));

const Error401Page = lazy(() => import('src/pages/401'));
const Error404Page = lazy(() => import('src/pages/404'));
const Error500Page = lazy(() => import('src/pages/500'));

// Pantry
const PantryListPage = lazy(() => import('src/pages/myPantry/list'));
const PantryDetailPage = lazy(() => import('src/pages/myPantry/detail'));
const PantryEditPage = lazy(() => import('src/pages/myPantry/edit'));
const PantryAddPage = lazy(() => import('src/pages/myPantry/add'));

export const routes: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: 'myPantry',
      //   children: [
      //     {
      //       index: true,
      //       element: <PantryListPage />,
      //     },
      //     {
      //       path: 'add',
      //       element: <PantryAddPage />,
      //     },
      //     {
      //       path: ':pantryId',
      //       element: <PantryDetailPage />,
      //     },
      //     {
      //       path: ':pantryId/edit',
      //       element: <PantryEditPage />,
      //     },
      //   ],
      // },
    ],
  },
  ...authRoutes,
  ...myPantryRoutes,
  {
    path: '401',
    element: <Error401Page />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '500',
    element: <Error500Page />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
