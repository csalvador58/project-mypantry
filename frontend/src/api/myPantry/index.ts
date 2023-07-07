import type { Pantry, PantryAdd, PantryCount } from 'src/types/pantry';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import { pantry, myPantry } from './data';
import {
  fetchPantry,
  fetchPantryCount,
  fetchPantryItem,
  fetchPantryItemAdd,
  fetchPantryItemUpdate,
  // fetchUpdatePantryItem,
} from './fetchPantry';

export type GetMyPantryRequest = {
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

export type GetPantryItemRequest = { id: string };

// export type UpdatePantryItemRequest = {
//   id: string;
//   data: PantryUpdate;
// };

type AddUpdatePantryResponse = boolean;

type GetPantryResponse = Promise<Pantry>;
type GetPantryCountResponse = Promise<PantryCount>;

class MyPantryApi {

  async addPantryItem(
    request: PantryAdd
  ): Promise<AddUpdatePantryResponse> {
    let data = await fetchPantryItemAdd(request);
    return Promise.resolve(data);
  }

  async getMyPantry(request: GetMyPantryRequest): Promise<GetMyPantryResponse> {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    // let data = deepCopy(myPantry) as Pantry[];
    let data = deepCopy(await fetchPantry()) as Pantry[];

    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((pantry) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties: ('note' | 'name')[] = ['note', 'name'];

          properties.forEach((property) => {
            if (
              pantry[property]
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

  // async getPantryItem(request?: GetPantryRequest): Promise<GetPantryResponse> {
  async getPantryItem(
    request: GetPantryItemRequest
  ): Promise<GetPantryResponse> {
    let data = await fetchPantryItem(request.id);
    return Promise.resolve(deepCopy(data));
  }
  
  async getPantryCount(): Promise<GetPantryCountResponse> {
    let count = await fetchPantryCount();
    return Promise.resolve(deepCopy(count));
  }

  async updatePantryItem(
    request: Pantry
  ): Promise<AddUpdatePantryResponse> {
    let data = await fetchPantryItemUpdate(request);
    return Promise.resolve(data);
  }
}

export const myPantryApi = new MyPantryApi();
