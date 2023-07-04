import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';

export const addPantryItem = async (
  pantryItemBody: IPantryItem
): Promise<IPantryItemDocument> => {
  console.log('pantryItemBody');
  console.log(pantryItemBody);
  return PantryItem.create(pantryItemBody);
};

export const getPantryItems = async (
  userId: string,
  itemId?: string
): Promise<IPantryItemDocument> => {
  console.log('pantryItem.service - getPantryItems')
  console.log('itemId, userId')
  console.log(itemId, userId)
  if (itemId) {
    return await PantryItem.find({ _id: itemId }).lean();
  }
  return PantryItem.find({ userId: userId }).lean();
};
