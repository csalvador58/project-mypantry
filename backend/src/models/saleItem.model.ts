import mongoose, { Document, Model } from 'mongoose';

export interface ISaleItem {
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

export interface ISaleItemDocument extends ISaleItem, Document {}
export interface ISaleItemModel extends Model<ISaleItemDocument> {}

const saleItemSchema = new mongoose.Schema({
  storeItemId: { type: String, unique: true },
  startDate: { type: Date },
  endDate: { type: Date },
  imageUrl: { type: String },
  name: { type: String, required: true },
  size: { type: String },
  currency: { type: String, default: '$' },
  salePrice: { type: Number, required: true },
  saleQuantity: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  baseQuantity: { type: Number, required: true },
  note: { type: String },
  storeName: {type: String, required: true},
  storeId: {type: String},
  location1: { type: Boolean, default: false },
  location2: { type: Boolean, default: false },
  location3: { type: Boolean, default: false },
  location4: { type: Boolean, default: false },
  location5: { type: Boolean, default: false },
});

const SaleItem = mongoose.model<ISaleItemDocument, ISaleItemModel>('SaleItem', saleItemSchema)

export default SaleItem;