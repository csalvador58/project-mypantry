export interface Customer {
  id: string;
  address1?: string;
  address2?: string;
  avatar?: string;
  balance?: number;
  city?: string;
  country?: string;
  currency?: string;
  note: string;
  inPantry1?: boolean;
  inPantry2?: boolean;
  inPantry3?: boolean;
  hasDiscount?: boolean;
  freezer?: boolean;
  other?: boolean;
  isVerified?: boolean;
  name: string;
  phone?: string;
  state?: string;
  totalSpent?: number;
  totalOrders?: number;
  updatedAt?: number;
  vatRate?: number;
  zipCode?: string;
}

export interface CustomerLog {
  id: string;
  createdAt: number;
  description: string;
  ip: string;
  method: string;
  route: string;
  status: number;
}

export interface CustomerEmail {
  id: string;
  description: string;
  createdAt: number;
}

export interface CustomerInvoice {
  id: string;
  issueDate: number;
  status: string;
  amount: number;
}