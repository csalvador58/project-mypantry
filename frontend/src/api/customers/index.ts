import type { Customer, CustomerEmail, CustomerInvoice, CustomerLog } from 'src/types/customer';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import { customer, customers, emails, invoices, logs } from './data';

type GetCustomersRequest = {
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

type GetCustomersResponse = Promise<{
  data: Customer[];
  count: number;
}>;

type GetCustomerRequest = object;

type GetCustomerResponse = Promise<Customer>;

type GetCustomerEmailsRequest = object;

type GetCustomerEmailsResponse = Promise<CustomerEmail[]>;

type GetCustomerInvoicesRequest = object;

type GetCustomerInvoicesResponse = Promise<CustomerInvoice[]>;

type GetCustomerLogsRequest = object;

type GetCustomerLogsResponse = Promise<CustomerLog[]>;

class CustomersApi {
  getCustomers(request: GetCustomersRequest = {}): GetCustomersResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(customers) as Customer[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((customer) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties: ('note' | 'name')[] = ['note', 'name'];

          properties.forEach((property) => {
            if ((customer[property]).toLowerCase().includes(filters.query!.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.inPantry1 !== 'undefined') {
          if (customer.inPantry1 !== filters.inPantry1) {
            return false;
          }
        }
        if (typeof filters.inPantry2 !== 'undefined') {
          if (customer.inPantry2 !== filters.inPantry2) {
            return false;
          }
        }
        if (typeof filters.inPantry3 !== 'undefined') {
          if (customer.inPantry3 !== filters.inPantry3) {
            return false;
          }
        }

        if (typeof filters.freezer !== 'undefined') {
          if (customer.freezer !== filters.freezer) {
            return false;
          }
        }

        if (typeof filters.other !== 'undefined') {
          if (customer.other !== filters.other) {
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

  getCustomer(request?: GetCustomerRequest): GetCustomerResponse {
    return Promise.resolve(deepCopy(customer));
  }

  getEmails(request?: GetCustomerEmailsRequest): GetCustomerEmailsResponse {
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request?: GetCustomerInvoicesRequest): GetCustomerInvoicesResponse {
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request?: GetCustomerLogsRequest): GetCustomerLogsResponse {
    return Promise.resolve(deepCopy(logs));
  }
}

export const customersApi = new CustomersApi();
