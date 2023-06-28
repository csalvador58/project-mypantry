import { RequestHandler } from 'express';
import { IPantryItem } from '../models/pantryItem.model';
import * as pantryService from '../services/pantryItem.service';
import catchAsync from '../utils/catchAsync';

export const addPantryItem: RequestHandler = catchAsync(async (req, res) => {
  console.log('pantryItem.controller: ')
  const item = req.body as IPantryItem;
  console.log('item')
  console.log(item)

  const result = await pantryService.addPantryItem(item);

  res
    .status(201)
    .json({ message: 'Pantry item added successfully', item: result });
});
