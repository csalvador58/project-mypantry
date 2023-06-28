import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';

export const addPantryItem = async (
  pantryItemBody: IPantryItem
): Promise<IPantryItemDocument> => {
  return PantryItem.create(pantryItemBody);
};

export const getPantryItems = async (): Promise<IPantryItemDocument> => {
  return PantryItem.find().lean();
};
