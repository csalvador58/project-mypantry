import mongoose from 'mongoose';
import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';

export const addPantryItem = async (
  pantryItemBody: IPantryItem
): Promise<IPantryItemDocument> => {
  return PantryItem.create(pantryItemBody);
};

export const deletePantryItem = async (
  itemId: string
): Promise<IPantryItem | null> => {
  // console.log('pantryItem.service - getPantryItems';

  return PantryItem.findByIdAndDelete(new mongoose.Types.ObjectId(itemId));
};

export const getPantryItems = async (
  userId: string,
  itemId?: string
): Promise<IPantryItemDocument> => {
  // console.log('pantryItem.service - getPantryItems')

  if (itemId) {
    return await PantryItem.find({ _id: itemId }).lean();
  }
  return PantryItem.find({ userId: userId }).lean();
};

export const getPantryItemsCount = async (
  userId: string,
): Promise<number> => {
  // console.log('pantryItem.service - getPantryItemsCount')

  return PantryItem.countDocuments({ userId: userId }).lean();
};

export const updatePantryItem = async (
  itemId: string,
  updatedItem: IPantryItem
): Promise<IPantryItemDocument | null> => {
  return await PantryItem.findByIdAndUpdate(
    new mongoose.Types.ObjectId(itemId),
    updatedItem,
    { new: true }
  );
};
