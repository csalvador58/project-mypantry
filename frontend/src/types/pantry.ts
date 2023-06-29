export interface Pantry {
  id: string;
  price?: number;
  currency?: string;
  note: string;
  location1?: boolean;
  location2?: boolean;
  location3?: boolean;
  location4?: boolean;
  location5?: boolean;
  favorite?: boolean;
  name: string;
  quantity?: number;
  updatedAt?: number;
}

export interface PantryLog {
  id: string;
  createdAt: number;
  description: string;
  ip: string;
  method: string;
  route: string;
  status: number;
}

export interface PantryEmail {
  id: string;
  description: string;
  createdAt: number;
}

export interface PantryInvoice {
  id: string;
  issueDate: number;
  status: string;
  amount: number;
}