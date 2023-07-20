import mongoose, { Document, Model } from 'mongoose';
import { PANTRY_CONSTANTS as PANTRY } from '../utils/constants.js';

export interface IPantryItem {
  name: string;
  createdAt?: Date;
  currency?: string;
  favorite?: boolean;
  location1?: boolean;
  location2?: boolean;
  location3?: boolean;
  location4?: boolean;
  location5?: boolean;
  note?: string;
  price?: number | null;
  quantity?: number | null;
  updatedAt?: Date;
  userId: mongoose.Types.ObjectId;
}

export interface IPantryItemDocument extends IPantryItem, Document {}
export interface IPantryItemModel extends Model<IPantryItemDocument> {}

export interface IUpdatePantryItem
  extends Omit<
    IPantryItem,
    | 'name'
    | 'createdAt'
    | 'currency'
    | 'favorite'
    | 'location1'
    | 'location2'
    | 'location3'
    | 'location4'
    | 'location5'
    | 'note'
    | 'price'
    | 'quantity'
    | 'updatedAt'
  > {
  [key: string]: any;
}

const pantryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: PANTRY.MIN_NAME,
      maxLength: PANTRY.MAX_NAME,
    },
    currency: { type: String, default: '$' },
    favorite: { type: Boolean, default: false },
    location1: { type: Boolean, default: false },
    location2: { type: Boolean, default: false },
    location3: { type: Boolean, default: false },
    location4: { type: Boolean, default: false },
    location5: { type: Boolean, default: false },
    note: { type: String, minLength: PANTRY.MIN_NOTE, maxLength: PANTRY.MAX_NOTE, default: '  ' },
    price: { type: Number, default: null },
    quantity: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);


// Use compound index make a field unique
pantryItemSchema.index({ userId: 1, name: 1 }, { unique: true });

// create text index
pantryItemSchema.index({ name: 'text', note: 'text'});

const PantryItem = mongoose.model<IPantryItemDocument, IPantryItemModel>(
  'PantryItem',
  pantryItemSchema
);
export default PantryItem;
