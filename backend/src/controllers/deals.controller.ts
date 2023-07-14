import { RequestHandler } from 'express';
import { catchAsync } from '../utils';
import { AuthenticatedRequest } from './token.controller';

interface TItemDeal {
  id: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  name: string;
  size: string;
  salePrice: number;
  saleQuantity: number;
  basePrice: number;
  baseQuantity: number;
  note: string;
}

interface TStore01Response {
  id: string;
  start_date?: string;
  end_date?: string;
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
}

export const getStore01Deals: RequestHandler = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    console.log('deals.controller: getStore01Deals');

    const myHeaders = new Headers();
    myHeaders.append(
      'Accept',
      'application/json, text/javascript, */*; q=0.01'
    );
    myHeaders.append('Referer', 'https://townandcountrymarkets.com/');
    myHeaders.append('sec-ch-ua-mobile', '?0');
    myHeaders.append(
      'User-Agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );
    myHeaders.append('sec-ch-ua-platform', '"macOS"');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.freshop.com/1/offers?app_key=town_and_country&intent=circular&limit=-1&store_id=4236',
      requestOptions
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    const filteredData: TItemDeal[] = data.items.map(
      (item: TStore01Response) => ({
        id: item.id,
        startDate: item.start_date && new Date(item.start_date),
        endDate: item.end_date && new Date(item.end_date),
        imageUrl: item.cover_image_url,
        name: item.name,
        size: item.size,
        salePrice: item.config?.price,
        saleQuantity: item.config?.for_quantity || 1,
        basePrice: item.base_price,
        baseQuantity: item.split_quantity,
        note: item.sale_price_md,
      })
    );

    console.log('filteredData');
    console.log(filteredData);

    return res.status(200).json({ message: 'Store 01 deals', deals: filteredData });
  }
);
