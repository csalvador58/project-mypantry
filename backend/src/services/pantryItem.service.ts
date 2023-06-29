import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';

export const addPantryItem = async (
  pantryItemBody: IPantryItem
): Promise<IPantryItemDocument> => {
  return PantryItem.create(pantryItemBody);
};

export const getPantryItems = async (userId: string): Promise<IPantryItemDocument> => {
  return PantryItem.find({userId}).lean();
};
