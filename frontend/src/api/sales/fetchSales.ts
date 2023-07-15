import { ApiError } from 'src/error/error-classes';
import { Sales, SalesCount } from 'src/types/sales';
import { MY_PANTRY } from 'src/utils/constants';

interface IItem extends Omit<Sales, 'id'> {
  _id: string;
}

const STORAGE_KEY = MY_PANTRY.STORAGE_KEY;
const DOMAIN = MY_PANTRY.DOMAIN;

export const fetchSalesFromApi = async () => {
  let salesData: Sales[] = [];

  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/sales/update`;
    const method = 'PUT';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    console.log('fetch sales api - data')
    console.log(data)

    if (data.sales && data.sales.length) {
      data.sales.forEach((item: IItem) => {
        salesData.push({
          id: item._id,
          storeItemId: item.storeItemId,
          startDate: item.startDate,
          endDate: item.endDate,
          imageUrl: item.imageUrl,
          name: item.name,
          size: item.size,
          salePrice: item.salePrice,
          saleQuantity: item.saleQuantity,
          basePrice: item.basePrice,
          baseQuantity: item.baseQuantity,
          note: item.note,
          storeName: item.storeName,
          storeId: item.storeId,
          location1: item.location1,
          location2: item.location2,
          location3: item.location3,
          location4: item.location4,
          location5: item.location5,
          currency: item.currency,
        });
      });
    }

    return salesData;

  } catch (error) {
    throw new ApiError(error.message);
  }
}

export const fetchSalesFromDB = async (): Promise<Sales[]> => {
  let salesData: Sales[] = [];

  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/sales`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    if (data.sales && data.sales.length) {
      data.sales.forEach((item: IItem) => {
        salesData.push({
          id: item._id,
          storeItemId: item.storeItemId,
          startDate: item.startDate,
          endDate: item.endDate,
          imageUrl: item.imageUrl,
          name: item.name,
          size: item.size,
          salePrice: item.salePrice,
          saleQuantity: item.saleQuantity,
          basePrice: item.basePrice,
          baseQuantity: item.baseQuantity,
          note: item.note,
          storeName: item.storeName,
          storeId: item.storeId,
          location1: item.location1,
          location2: item.location2,
          location3: item.location3,
          location4: item.location4,
          location5: item.location5,
          currency: item.currency,
        });
      });
    }

    return salesData;
  } catch (error) {
    throw new ApiError(error.message);
  }
};

export const fetchSalesItemDelete = async (
  itemId: string
): Promise<boolean> => {
  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/pantry/${itemId}`;
    const method = 'DELETE';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    if (data.item) {
      return true;
    }
    return false;
  } catch (error) {
    throw new ApiError(error.message);
  }
};

export const fetchSalesCount = async (): Promise<SalesCount> => {
  let salesNull: SalesCount = { count: 0 };
  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/sales/count`;
    const method = 'GET';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    return data ? { count: data.salesCount } : salesNull;
  } catch (error) {
    // console.error(error);
    throw new ApiError(error);
  }
};
