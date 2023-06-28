import mongoose, { Schema, Document } from 'mongoose';

export interface IPantryItem {
  name: string;
  isFavorite?: boolean;
  lastUpdated?: Date;
  location?: string;
  notes?: string;
  price?: number | null;
  quantity?: number | null;
}

export interface IPantryItemDocument extends Document {}

export type UpdatePantryItem = Omit<
  IPantryItem,
  'isFavorite' | 'lastUpdated' | 'location' | 'notes' | 'price' | 'quantity'
>;

const pantryItemSchema = new Schema({
  name: { type: String, unique: true, required: true },
  isFavorite: { type: Boolean },
  lastUpdated: { type: Date, default: Date.now() },
  location: { type: String },
  notes: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

export default mongoose.model<IPantryItem>('PantryItem', pantryItemSchema);
