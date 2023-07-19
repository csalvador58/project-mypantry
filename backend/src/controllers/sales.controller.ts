import { RequestHandler } from 'express';
import { ISaleItem, ISaleItemDocument } from '../models/saleItem.model.js';
import * as salesService from '../services/saleItem.service.js';
import { catchAsync } from '../utils/index.js';
import { AuthenticatedRequest } from './token.controller.js';


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
