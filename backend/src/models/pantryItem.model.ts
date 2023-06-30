import mongoose, { Document, Model } from 'mongoose';

export interface IPantryItem {
  name: string;
  currency?: string;
  favorite?: boolean;
  lastUpdated?: Date;
  location1?: string;
  location2?: string;
  location3?: string;
  location4?: string;
  location5?: string;
  note?: string;
  price?: number | null;
  quantity?: number | null;
  userId: string;
}

export interface IPantryItemDocument extends IPantryItem, Document {}
export interface IPantryItemModel extends Model<IPantryItemDocument> {}

export type UpdatePantryItem = Omit<
  IPantryItem,
  | 'currency'
  | 'favorite'
  | 'lastUpdated'
  | 'location1'
  | 'location2'
  | 'location3'
  | 'location4'
  | 'location5'
  | 'note'
  | 'price'
  | 'quantity'
>;

const pantryItemSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  currency: { type: String, default: '$' },
  favorite: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now() },
  location1: { type: Boolean, default: false },
  location2: { type: Boolean, default: false },
  location3: { type: Boolean, default: false },
  location4: { type: Boolean, default: false },
  location5: { type: Boolean, default: false },
  note: { type: String },
  price: { type: Number, default: null },
  quantity: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// create text index
pantryItemSchema.index({ note: 'text' });

const PantryItem = mongoose.model<IPantryItemDocument, IPantryItemModel>(
  'PantryItem',
  pantryItemSchema
);
export default PantryItem;
