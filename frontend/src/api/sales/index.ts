import type { Sales, SalesCount } from 'src/types/sales';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import {
  fetchSalesFromDB,
  fetchSalesCount,
  fetchSalesItemDelete,
  fetchSalesFromApi,
} from './fetchSales';
import { ApiError } from 'src/error/error-classes';

export type GetSalesRequest = {
  filters?: {
    query?: string;
    location1?: boolean;
    location2?: boolean;
    location3?: boolean;
    location4?: boolean;
    location5?: boolean;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetSalesResponse = Promise<{
  data: Sales[];
  count: number;
}>;

export type GetSalesItemRequest = { id: string };
export type DeleteSalesItemRequest = { id: string };

// export type UpdatePantryItemRequest = {
//   id: string;
//   data: PantryUpdate;
// };

type AddUpdateSalesResponse = boolean;

type GetSalesItemResponse = Promise<Sales>;
type GetSalesCountResponse = Promise<SalesCount>;

class SalesApi {
  //   async deleteSalesItem(
  //     request: DeleteSalesItemRequest
  //   ): Promise<GetSalesResponse> {
  //     try {
  //       let data = await fetchSalesItemDelete(request.id);
  //       return deepCopy(data);
  //     } catch (error) {
  //       throw new ApiError(error);
  //     }
  //   }

  async getSalesFromDB(request: GetSalesRequest): Promise<GetSalesResponse> {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data: Sales[];
    try {
      // let data = deepCopy(myPantry) as Pantry[];
      data = deepCopy(await fetchSalesFromDB());

    } catch (error) {
      throw new ApiError(error);
    }

    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((sale) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties: ('name' | 'storeName')[] = ['name', 'storeName'];

          properties.forEach((property) => {
            if (
              sale[property]
                .toLowerCase()
                .includes(filters.query!.toLowerCase())
            ) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.location1 !== 'undefined') {
          if (sale.location1 !== filters.location1) {
            return false;
          }
        }
        if (typeof filters.location2 !== 'undefined') {
          if (sale.location2 !== filters.location2) {
            return false;
          }
        }
        if (typeof filters.location3 !== 'undefined') {
          if (sale.location3 !== filters.location3) {
            return false;
          }
        }

        if (typeof filters.location4 !== 'undefined') {
          if (sale.location4 !== filters.location4) {
            return false;
          }
        }

        if (typeof filters.location5 !== 'undefined') {
          if (sale.location5 !== filters.location5) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return {
      data,
      count,
    };
  }

  async updateSalesData(): Promise<GetSalesResponse> {
    try {
      const data = deepCopy(await fetchSalesFromApi());
      let count = data.length;

      return {
        data,
        count,
      };
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async getSalesCount(): Promise<GetSalesCountResponse> {
    try {
      let count = await fetchSalesCount();
      return deepCopy(count);
    } catch (error) {
      throw new ApiError(error);
    }
  }
}

export const salesApi = new SalesApi();
