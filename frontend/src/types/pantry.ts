export interface Pantry {
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
  price?: number;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PantryCount {
  count: number
}