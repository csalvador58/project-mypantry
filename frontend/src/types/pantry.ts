export interface Pantry {
  id: string;
  price?: string;
  location?: string;
  currency?: string;
  note: string;
  inPantry1?: boolean;
  inPantry2?: boolean;
  inPantry3?: boolean;
  favorite?: boolean;
  freezer?: boolean;
  other?: boolean;
  name: string;
  quantity?: string;
  totalSpent?: number;
  totalOrders?: number;
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