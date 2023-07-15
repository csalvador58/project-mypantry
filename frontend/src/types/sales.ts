export interface Sales {
    id: string;
    storeItemId: string;
    startDate?: Date;
    endDate?: Date;
    imageUrl?: string;
    name: string;
    size?: string;
    salePrice: number;
    saleQuantity: number;
    basePrice?: number;
    baseQuantity?: number;
    note?: string;
    storeName: string;
    storeId?: string;
    location1?: boolean;
    location2?: boolean;
    location3?: boolean;
    location4?: boolean;
    location5?: boolean;
    currency?: string;
  }
  
  export interface SalesCount {
    count: number;
  }