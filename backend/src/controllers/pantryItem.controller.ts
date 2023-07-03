import { RequestHandler } from 'express';
import { IPantryItem } from '../models/pantryItem.model';
import * as pantryService from '../services/pantryItem.service';
import catchAsync from '../utils/catchAsync';
import { AuthenticatedRequest } from './token.controller';

export const addPantryItem: RequestHandler = catchAsync(async (req: AuthenticatedRequest, res) => {
  console.log('pantryItem.controller: addPantryItem');
  let item: IPantryItem;
  item = {
    ...req.body,
    userId: req.auth!.payload.sub,
  };

  console.log('item')
  console.log(item)

  const result = await pantryService.addPantryItem(item);

  res
    .status(201)
    .json({ message: 'Pantry item added successfully', item: result });
});

export const getPantryItems: RequestHandler = catchAsync(async (req, res) => {
  console.log('pantryItem.controller: getPantryItems');

  const tempUserId = '649b8084878eb16d80764fd9';

  const result = await pantryService.getPantryItems(tempUserId);
  res.status(200).json({ message: 'Request success', pantry: result });
});
