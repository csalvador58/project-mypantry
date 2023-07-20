import { RequestHandler } from 'express';
import { IPantryItem, IPantryItemDocument } from '../models/pantryItem.model.js';
import * as pantryService from '../services/pantryItem.service.js';
import {catchAsync} from '../utils/index.js';
import { AuthenticatedRequest } from './token.controller.js';

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

    console.log('itemId')
    console.log(itemId)

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    // const deletedItem = await pantryService.deletePantryItem(itemId);
    const deletedItem = await pantryService.deletePantryItemTest(itemId);

    console.log('deletedItem')
    console.log(deletedItem)

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
    res.status(200).json({ message: 'Request success', pantry: result });
  }
);

export const getPantryItemsCount: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('pantryItem.controller: getPantryItemsCount');
    const userId = req.auth!.payload.sub;

    let result: number = await pantryService.getPantryItemsCount(userId);

    res.status(200).json({ message: 'Request success', pantryCount: result });
  }
);

export const updatePantryItem: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('pantryItem.controller: updatePantryItem');
    const itemId = req.params?.['id'];
    const updateItem: IPantryItem = {
      ...req.body,
      userId: req.auth!.payload.sub,
    };

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const updatedItem = await pantryService.updatePantryItem(
      itemId,
      updateItem
    );

    if (!updatedItem) {
      // 204 No Content
      return res.status(204).send();
    }
    return res
      .status(200)
      .json({ message: 'Item updated successfully', item: updatedItem });
  }
);
