import type { Pantry } from 'src/types/pantry';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import { pantry, myPantry } from './data';
import { fetchPantry, fetchPantryItem } from './fetchPantry';

type GetMyPantryRequest = {
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

type GetMyPantryResponse = Promise<{
  data: Pantry[];
  count: number;
}>;

type GetPantryRequest = object;

type GetPantryResponse = Promise<Pantry>;

class MyPantryApi {
  async getMyPantry(request: GetMyPantryRequest = {}): Promise<GetMyPantryResponse> {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    // let data = deepCopy(myPantry) as Pantry[];
    let data = await fetchPantry();
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((pantry) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties: ('note' | 'name')[] = ['note', 'name'];

          properties.forEach((property) => {
            if ((pantry[property]).toLowerCase().includes(filters.query!.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.location1 !== 'undefined') {
          if (pantry.location1 !== filters.location1) {
            return false;
          }
        }
        if (typeof filters.location2 !== 'undefined') {
          if (pantry.location2 !== filters.location2) {
            return false;
          }
        }
        if (typeof filters.location3 !== 'undefined') {
          if (pantry.location3 !== filters.location3) {
            return false;
          }
        }

        if (typeof filters.location4 !== 'undefined') {
          if (pantry.location4 !== filters.location4) {
            return false;
          }
        }

        if (typeof filters.location5 !== 'undefined') {
          if (pantry.location5 !== filters.location5) {
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

    return Promise.resolve({
      data,
      count,
    });
  }

  async getPantry(request?: GetPantryRequest): Promise<GetPantryResponse> {
    let data = await fetchPantryItem('64a4e75d4765b390680d642e');
    return Promise.resolve(deepCopy(data));
  }
}

export const myPantryApi = new MyPantryApi();
