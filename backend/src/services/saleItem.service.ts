import mongoose from 'mongoose';
import fetch, { Headers, RequestRedirect, RequestInit } from 'node-fetch';
import SaleItem, {
  ISaleItem,
  ISaleItemDocument,
} from '../models/saleItem.model.js';
import { STORE_CONSTANTS } from '../utils/constants.js';

interface TStore01Response {
  id: string;
  start_date?: string;
  finish_date?: string;
  cover_image_url?: string;
  name?: string;
  size?: string;
  config?: {
    price?: number;
    for_quantity?: number;
  };
  base_price: number;
  split_quantity: number;
  sale_price_md: string;
  store_ids: string[];
}

export const deleteSaleItems = async (
  query: string
): Promise<ISaleItem[] | null> => {
  // console.log('pantryItem.service - getPantryItems';
  console.log('sale item service - query');
  console.log(query);
  const items = query.split(',').map((item) => {
    return new mongoose.Types.ObjectId(item);
  });

  return await SaleItem.deleteMany({ _id: { $in: items } }).lean();
  // return null;
};

export const getSaleItemsFromApi = async () => {
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json, text/javascript, */*; q=0.01');
  myHeaders.append('Referer', 'https://townandcountrymarkets.com/');
  myHeaders.append('sec-ch-ua-mobile', '?0');
  myHeaders.append(
    'User-Agent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  myHeaders.append('sec-ch-ua-platform', 'macOS');

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch(
    'https://api.freshop.com/1/offers?app_key=town_and_country&intent=circular&limit=-1&store_id=4236',
    requestOptions
  );

  if (!response.ok) {
    const data: any = await response.json();
    throw new Error(
      `${response.status}: ${response.statusText}, ${data.error}`
    );
  }

  const data: any = await response.json();

  console.log('salesItem service - raw api data');
  console.log(data);

  const filteredData: ISaleItem[] = data.items.map(
    (item: TStore01Response) => ({
      storeItemId: item.id,
      startDate: item.start_date && new Date(item.start_date),
      endDate: item.finish_date && new Date(item.finish_date),
      imageUrl: item.cover_image_url,
      name: item.name,
      size: item.size,
      salePrice: item.config?.price,
      saleQuantity: item.config?.for_quantity || 1,
      basePrice: item.base_price,
      baseQuantity: item.split_quantity,
      note: item.sale_price_md,
      storeName: STORE_CONSTANTS[item.store_ids[0]!]
        ? STORE_CONSTANTS[item.store_ids[0]!]![0]
        : '',
      storeId: item.store_ids[0],
      location1:
        STORE_CONSTANTS[item.store_ids[0]!]?.includes('location1') || false,
      location2:
        STORE_CONSTANTS[item.store_ids[0]!]?.includes('location2') || false,
      location3:
        STORE_CONSTANTS[item.store_ids[0]!]?.includes('location3') || false,
      location4:
        STORE_CONSTANTS[item.store_ids[0]!]?.includes('location4') || false,
      location5:
        STORE_CONSTANTS[item.store_ids[0]!]?.includes('location5') || false,
    })
  );

  return filteredData;
};

export const getSaleItemsFromDB = async () => {
  return await SaleItem.find().lean();
};

export const updateSaleItems = async (
  saleItems: ISaleItem[]
): Promise<ISaleItemDocument[]> => {
  let storedItems: ISaleItemDocument[] = [];

  console.log('sale item service - update sale items - saleItems');
  console.log(saleItems);

  for (const item of saleItems) {
    try {
      const storedItem: ISaleItemDocument = await SaleItem.findOneAndReplace(
        { storeItemId: item.storeItemId },
        item,
        { upsert: true, new: true }
      ).lean();
      if (storedItem) {
        storedItems.push(storedItem);
      }
    } catch (error) {
      console.log('UpdateSalesItem not saved: ');
      console.log(error);
    }
  }

  return storedItems;
};

export const getSaleItemsCount = async (): Promise<number> => {
  return await SaleItem.countDocuments().lean();
};
