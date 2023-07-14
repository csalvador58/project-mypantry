import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@mui/material';

import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import ShoppingBag03 from 'src/icons/untitled-ui/duocolor/shopping-bag-03';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.index,
            icon: (
              <SvgIcon fontSize='small'>
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: 'Pantry',
            path: paths.myPantry.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Users03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: 'List',
                path: paths.myPantry.index,
              },
              {
                title: 'Add',
                path: paths.myPantry.add
              },
              // {
              //   title: 'Edit',
              //   path: paths.myPantry.edit
              // }
            ],
          },
          {
            title: 'Sales',
            path: paths.sales.index,
            icon: (
              <SvgIcon fontSize='small'>
                <ShoppingBag03 />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
