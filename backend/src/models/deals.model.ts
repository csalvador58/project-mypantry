import mongoose, { Document, Model } from 'mongoose';

export interface ISaleItem {
  itemId: string;
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
}

export interface ISaleItemDocument extends ISaleItem, Document {}
export interface ISaleItemModel extends Model<ISaleItemDocument> {}

const saleItemSchema = new mongoose.Schema({
  itemId: { type: String, unique: true },
  startDate: { type: Date },
  endDate: { type: Date },
  imageUrl: { type: String },
  name: { type: String, required: true },
  size: { type: String },
  salePrice: { type: Number, required: true },
  saleQuantity: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  baseQuantity: { type: Number, required: true },
  note: { type: String },
  storeName: {type: String, required: true},
  storeId: {type: String},
});

const SaleItem = mongoose.model<ISaleItemDocument, ISaleItemModel>('SaleItem', saleItemSchema)

export default SaleItem;