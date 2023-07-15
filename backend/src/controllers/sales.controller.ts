import { RequestHandler } from 'express';
import { ISaleItem, ISaleItemDocument } from '../models/saleItem.model';
import * as salesService from '../services/saleItem.service';
import { catchAsync } from '../utils';
import { AuthenticatedRequest } from './token.controller';


export const updateStore01SalesFromApi: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    console.log('sales.controller: getStore01Sales');

    const storeSalesData: ISaleItem[] = await salesService.getSaleItemsFromApi();
    console.log(' sales.comtroller - storeSalesData')
    console.log(storeSalesData)
    const storedItems: ISaleItemDocument[] = await salesService.updateSaleItems(storeSalesData)

    console.log('sales.controller - storedItems')
    console.log(storedItems)
    
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

export const getSalesItemsCount: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    console.log('sales.controller: getSaleItemsCount');

    let result: number = await salesService.getSaleItemsCount();

    res.status(200).json({ message: 'Request success', SaleItemsCount: result });
  }
);
