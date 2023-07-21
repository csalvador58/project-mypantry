import { RequestHandler } from 'express';
import { ISaleItem, ISaleItemDocument } from '../models/saleItem.model.js';
import * as salesService from '../services/saleItem.service.js';
import { catchAsync } from '../utils/index.js';
import { AuthenticatedRequest } from './token.controller.js';

export const deleteSaleItems: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('sales.controller: deleteSalesItem');
    const itemId = req.params?.['id'];

    console.log('itemId')
    console.log(itemId)

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    // const deletedItem = await pantryService.deletePantryItem(itemId);
    const deletedItem = await salesService.deleteSaleItems(itemId);

    console.log('deletedItem')
    console.log(deletedItem)

    if (!deletedItem) {
      // 204 No Content
      return res.status(204).send();
    }
    return res
      .status(200)
      .json({ message: 'Item(s) deleted successfully', item: deletedItem });
  }
);

export const updateStore01SalesFromApi: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    console.log('sales.controller: getStore01Sales');

    const storeSalesData: ISaleItem[] = await salesService.getSaleItemsFromApi();
    const storedItems: ISaleItemDocument[] = await salesService.updateSaleItems(storeSalesData)


    return res
      .status(200)
      .json({ message: 'Sale items: ', sales: storedItems });
  }
);

export const getStore01SalesFromDB: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    console.log('sales.controller: getStore01Sales');

    const storedItems: ISaleItemDocument[] = await salesService.getSaleItemsFromDB()

    return res
      .status(200)
      .json({ message: 'Sale items: ', sales: storedItems });
  }
);

export const getSaleItemsCount: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('sales.controller: getSaleItemsCount');

    let result: number = await salesService.getSaleItemsCount();

    res.status(200).json({ message: 'Request success', salesCount: result });
  }
);
