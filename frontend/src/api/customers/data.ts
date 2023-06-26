import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

import type { Customer, CustomerEmail, CustomerInvoice, CustomerLog } from 'src/types/customer';

const now = new Date();

export const customers: Customer[] = [
  {
    id: '5e887ac47eed253091be10cb',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: true,
    inPantry2: false,
    inPantry3: false,
    freezer: false,
    other: true,
    name: 'pasta',
    totalSpent: 3.00,
    totalOrders: 3,
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: false,
    inPantry2: false,
    inPantry3: true,
    freezer: true,
    other: false,
    name: 'Chicken',
    totalSpent: 0.00,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: false,
    inPantry2: true,
    inPantry3: false,
    freezer: false,
    other: false,
    name: 'steak',
    totalSpent: 5.00,
    totalOrders: 6,
    updatedAt: subDays(subHours(now, 4), 2).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e86809283e28b96d2d38537',
    location: 'Spain',
    currency: '$',
    note: 'item notes',
    inPantry1: true,
    inPantry2: false,
    inPantry3: false,
    freezer: false,
    other: true,
    name: 'Strawberry',
    totalSpent: 5.00,
    totalOrders: 1,
    updatedAt: subDays(subHours(now, 11), 2).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: true,
    inPantry2: false,
    inPantry3: false,
    freezer: true,
    other: false,
    name: 'cheese',
    totalSpent: 0.00,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 7), 3).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: false,
    inPantry2: true,
    inPantry3: false,
    freezer: true,
    other: false,
    name: 'broccoli',
    totalSpent: 0.00,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 5), 4).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: true,
    inPantry2: false,
    inPantry3: false,
    freezer: false,
    other: false,
    name: 'chocolate',
    totalSpent: 10.00,
    totalOrders: 4,
    updatedAt: subDays(subHours(now, 15), 4).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: true,
    inPantry2: false,
    inPantry3: false,
    freezer: false,
    other: true,
    name: 'potato chips',
    totalSpent: 10.00,
    totalOrders: 2,
    updatedAt: subDays(subHours(now, 2), 5).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e8877da9a65442b11551975',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: false,
    inPantry2: false,
    inPantry3: true,
    freezer: true,
    other: false,
    name: 'ice cream',
    totalSpent: 0.00,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 8), 6).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    location: 'USA',
    currency: '$',
    note: 'item notes',
    inPantry1: false,
    inPantry2: false,
    inPantry3: true,
    freezer: false,
    other: true,
    name: 'chicken nuggets',
    totalSpent: 2.00,
    totalOrders: 7,
    updatedAt: subDays(subHours(now, 1), 9).getTime(),
    price: '10.00',
    favorite: false,
    quantity: '4',
  }
];

export const customer: Customer = {
  id: '5e8680e60cba5019c5ca6fda',
  location: 'Pantry 1',
  currency: '$',
  note: 'item notes',
  inPantry1: false,
  inPantry2: false,
  inPantry3: true,
  freezer: false,
  other: true,
  name: 'chicken nuggets',
  totalSpent: 2.00,
  totalOrders: 7,
  updatedAt: subDays(subHours(now, 1), 9).getTime(),
  price: '10.00',
  favorite: false,
  quantity: '4',
};

export const emails: CustomerEmail[] = [
  {
    id: '5ece2ce3613486d95ffaea58',
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 3).getTime(),
    description: 'Order confirmation'
  },
  {
    id: '5ece2ce8cebf7ad1d100c0cd',
    createdAt: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
    description: 'Order confirmation'
  }
];

export const invoices: CustomerInvoice[] = [
  {
    id: '528651571NT',
    issueDate: now.getTime(),
    status: 'paid',
    amount: 1358.75
  },
  {
    id: '311658671JR',
    issueDate: now.getTime(),
    status: 'unpaid',
    amount: 1451.75
  }
];

export const logs: CustomerLog[] = [
  {
    id: '5ece2cfeb6e2ac847bba11ce',
    createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
    description: 'Purchase',
    ip: '84.234.243.42',
    method: 'POST',
    route: '/api/purchase',
    status: 200
  },
  {
    id: '5ece2d02510484b2952e1e05',
    createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
    description: 'Purchase',
    ip: '84.234.243.42',
    method: 'POST',
    route: '/api/purchase',
    status: 522
  },
  {
    id: '5ece2d08e2748e4e9788901a',
    createdAt: subDays(subMinutes(subSeconds(now, 23), 8), 2).getTime(),
    description: 'Cart remove',
    ip: '84.234.243.42',
    method: 'DELETE',
    route: '/api/products/d65654e/remove',
    status: 200
  },
  {
    id: '5ece2d0c47214e342c2d7f28',
    createdAt: subDays(subMinutes(subSeconds(now, 54), 20), 2).getTime(),
    description: 'Cart add',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products/d65654e/add',
    status: 200
  },
  {
    id: '5ece2d11e4060a97b2b57623',
    createdAt: subDays(subMinutes(subSeconds(now, 16), 34), 2).getTime(),
    description: 'Cart add',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products/c85727f/add',
    status: 200
  },
  {
    id: '5ece2d16cf6d53d8e33656af',
    createdAt: subDays(subMinutes(subSeconds(now, 30), 54), 2).getTime(),
    description: 'View product',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products/c85727f',
    status: 200
  },
  {
    id: '5ece2d1b2ec5071be9286a96',
    createdAt: subDays(subMinutes(subSeconds(now, 40), 56), 2).getTime(),
    description: 'Get products',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products',
    status: 200
  },
  {
    id: '5ece2d22e68d5498917e47bc',
    createdAt: subDays(subMinutes(subSeconds(now, 5), 57), 2).getTime(),
    description: 'Login',
    ip: '84.234.243.42',
    method: 'POST',
    route: '/api/auth/login',
    status: 200
  }
];
