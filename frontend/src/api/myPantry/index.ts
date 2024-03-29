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
  fetchPantryItemDelete,
  fetchPantryItemUpdate,
  // fetchUpdatePantryItem,
} from './fetchPantry';
import { ApiError } from 'src/error/error-classes';

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
// export type DeletePantryItemRequest = { id: string };
export type DeletePantryItemRequest = string[];

// export type UpdatePantryItemRequest = {
//   id: string;
//   data: PantryUpdate;
// };

type AddUpdatePantryResponse = boolean;

type GetPantryResponse = Promise<Pantry>;
type GetPantryCountResponse = Promise<PantryCount>;

class MyPantryApi {
  async addPantryItem(request: PantryAdd): Promise<AddUpdatePantryResponse> {
    try {
      let data = await fetchPantryItemAdd(request);
      return data;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async deletePantryItem(
    request: DeletePantryItemRequest
  ): Promise<GetPantryResponse> {
    try {
      let data = await fetchPantryItemDelete(request);
      return deepCopy(data);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async getMyPantry(request: GetMyPantryRequest): Promise<GetMyPantryResponse> {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data: Pantry[];
    try {
      // let data = deepCopy(myPantry) as Pantry[];
      data = deepCopy(await fetchPantry());
    } catch (error) {
      throw new ApiError(error);
    }

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

    return {
      data,
      count,
    };
  }

  // async getPantryItem(request?: GetPantryRequest): Promise<GetPantryResponse> {
  async getPantryItem(
    request: GetPantryItemRequest
  ): Promise<GetPantryResponse> {
    try {
      let data = await fetchPantryItem(request.id);
      return deepCopy(data);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async getPantryCount(): Promise<GetPantryCountResponse> {
    try {
      let count = await fetchPantryCount();
      return deepCopy(count);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async updatePantryItem(request: Pantry): Promise<AddUpdatePantryResponse> {
    try {
      let data = await fetchPantryItemUpdate(request);
      return data;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}

export const myPantryApi = new MyPantryApi();
