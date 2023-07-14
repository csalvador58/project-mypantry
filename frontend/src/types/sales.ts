export interface Sales {
    id: string;
    name: string;
    currency?: string;
    favorite?: boolean;
    location1?: boolean;
    location2?: boolean;
    location3?: boolean;
    location4?: boolean;
    location5?: boolean;
    note: string;
    price?: number | null;
    quantity?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface SalesCount {
    count: number;
  }
  
  export interface SalesAdd
    extends Omit<Sales, 'id' | 'currency' | 'createdAt' | 'updatedAt'> {}
  
  export interface SalesUpdateStatus {
    status: boolean;
  }