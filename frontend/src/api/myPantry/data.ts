import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

import type { Pantry } from 'src/types/pantry';

const now = new Date();

export const myPantry: Pantry[] = [
  {
    id: '5e887ac47eed253091be10cb',
    currency: '$',
    note: 'item notes',
    location1: true,
    location2: false,
    location3: false,
    location4: false,
    location5: true,
    name: 'pasta',
    lastUpdated: subDays(subHours(now, 7), 1).getTime(),
    price: 3.00,
    favorite: false,
    quantity: 4,
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    currency: '$',
    note: 'item notes',
    location1: false,
    location2: false,
    location3: true,
    location4: true,
    location5: false,
    name: 'Chicken',
    lastUpdated: subDays(subHours(now, 1), 2).getTime(),
    price: 0.00,
    favorite: false,
    quantity: 3,
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    currency: '$',
    note: 'item notes',
    location1: false,
    location2: true,
    location3: false,
    location4: false,
    location5: false,
    name: 'steak',
    lastUpdated: subDays(subHours(now, 4), 2).getTime(),
    price: 5.00,
    favorite: false,
    quantity: 6,
  },
  {
    id: '5e86809283e28b96d2d38537',
    currency: '$',
    note: 'item notes',
    location1: true,
    location2: false,
    location3: false,
    location4: false,
    location5: true,
    name: 'Strawberry',
    lastUpdated: subDays(subHours(now, 11), 2).getTime(),
    price: 5.00,
    favorite: false,
    quantity: 1,
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    currency: '$',
    note: 'item notes',
    location1: true,
    location2: false,
    location3: false,
    location4: true,
    location5: false,
    name: 'cheese',
    lastUpdated: subDays(subHours(now, 7), 3).getTime(),
    price: 0.00,
    favorite: false,
    quantity: 0,
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    currency: '$',
    note: 'item notes',
    location1: false,
    location2: true,
    location3: false,
    location4: true,
    location5: false,
    name: 'broccoli',
    lastUpdated: subDays(subHours(now, 5), 4).getTime(),
    price: 0.00,
    favorite: false,
    quantity: 3,
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    currency: '$',
    note: 'item notes',
    location1: true,
    location2: false,
    location3: false,
    location4: false,
    location5: false,
    name: 'chocolate',
    lastUpdated: subDays(subHours(now, 15), 4).getTime(),
    price: 10.00,
    favorite: false,
    quantity: 1,
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    currency: '$',
    note: 'item notes',
    location1: true,
    location2: false,
    location3: false,
    location4: false,
    location5: true,
    name: 'potato chips',
    lastUpdated: subDays(subHours(now, 2), 5).getTime(),
    price: 10.00,
    favorite: false,
    quantity: 2,
  },
  {
    id: '5e8877da9a65442b11551975',
    currency: '$',
    note: 'item notes',
    location1: false,
    location2: false,
    location3: true,
    location4: true,
    location5: false,
    name: 'ice cream',
    lastUpdated: subDays(subHours(now, 8), 6).getTime(),
    price: 0.00,
    favorite: false,
    quantity: 0,
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    currency: '$',
    note: 'item notes',
    location1: false,
    location2: false,
    location3: true,
    location4: false,
    location5: true,
    name: 'chicken nuggets',
    lastUpdated: subDays(subHours(now, 1), 9).getTime(),
    price: 2.00,
    favorite: false,
    quantity: 4,
  }
];

export const pantry: Pantry = {
  id: '5e8680e60cba5019c5ca6fda',
  currency: '$',
  note: 'item notes',
  location1: false,
  location2: false,
  location3: true,
  location4: false,
  location5: true,
  name: 'chicken nuggets',
  lastUpdated: subDays(subHours(now, 1), 9).getTime(),
  price: 2.00,
  favorite: false,
  quantity: 3,
};