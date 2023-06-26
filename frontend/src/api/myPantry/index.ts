import type { Pantry, PantryEmail, PantryInvoice, PantryLog } from 'src/types/pantry';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import { pantry, myPantry, emails, invoices, logs } from './data';

type GetMyPantryRequest = {
  filters?: {
    query?: string;
    inPantry1?: boolean;
    inPantry2?: boolean;
    inPantry3?: boolean;
    freezer?: boolean;
    other?: boolean;
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

type GetPantryEmailsRequest = object;

type GetPantryEmailsResponse = Promise<PantryEmail[]>;

type GetPantryInvoicesRequest = object;

type GetPantryInvoicesResponse = Promise<PantryInvoice[]>;

type GetPantryLogsRequest = object;

type GetPantryLogsResponse = Promise<PantryLog[]>;

class MyPantryApi {
  getMyPantry(request: GetMyPantryRequest = {}): GetMyPantryResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(myPantry) as Pantry[];
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

        if (typeof filters.inPantry1 !== 'undefined') {
          if (pantry.inPantry1 !== filters.inPantry1) {
            return false;
          }
        }
        if (typeof filters.inPantry2 !== 'undefined') {
          if (pantry.inPantry2 !== filters.inPantry2) {
            return false;
          }
        }
        if (typeof filters.inPantry3 !== 'undefined') {
          if (pantry.inPantry3 !== filters.inPantry3) {
            return false;
          }
        }

        if (typeof filters.freezer !== 'undefined') {
          if (pantry.freezer !== filters.freezer) {
            return false;
          }
        }

        if (typeof filters.other !== 'undefined') {
          if (pantry.other !== filters.other) {
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
      count
    });
  }

  getPantry(request?: GetPantryRequest): GetPantryResponse {
    return Promise.resolve(deepCopy(pantry));
  }

  getEmails(request?: GetPantryEmailsRequest): GetPantryEmailsResponse {
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request?: GetPantryInvoicesRequest): GetPantryInvoicesResponse {
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request?: GetPantryLogsRequest): GetPantryLogsResponse {
    return Promise.resolve(deepCopy(logs));
  }
}

export const myPantryApi = new MyPantryApi();
