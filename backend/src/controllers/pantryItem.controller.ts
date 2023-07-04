import { RequestHandler } from 'express';
import { IPantryItem, IPantryItemDocument } from '../models/pantryItem.model';
import * as pantryService from '../services/pantryItem.service';
import catchAsync from '../utils/catchAsync';
import { AuthenticatedRequest } from './token.controller';

export const addPantryItem: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('pantryItem.controller: addPantryItem');
    const item: IPantryItem = {
      ...req.body,
      userId: req.auth!.payload.sub,
    };

    const result = await pantryService.addPantryItem(item);

    res
      .status(201)
      .json({ message: 'Pantry item added successfully', item: result });
  }
);

export const deletePantryItem: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('pantry.controller: deletePantryItem');
    const itemId = req.params?.['id'];

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const deletedItem = await pantryService.deletePantryItem(itemId);
   
    if (!deletedItem) {
      // 204 No Content
      return res.status(204).send();
    }
    return res
      .status(200)
      .json({ message: 'Item deleted successfully', item: deletedItem });
  }
);

export const getPantryItems: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('pantryItem.controller: getPantryItems');
    const userId = req.auth!.payload.sub;
    const itemId = req.params?.['id'];

    let result: IPantryItemDocument;
    if (!itemId) {
      result = await pantryService.getPantryItems(userId);
    } else {
      result = await pantryService.getPantryItems(userId, itemId);
    }
    console.log('result');
    console.log(result);
    res.status(200).json({ message: 'Request success', pantry: result });
  }
);
