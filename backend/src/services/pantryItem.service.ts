import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';

export const addPantryItem = async (
  pantryItemBody: IPantryItem
): Promise<IPantryItemDocument> => {
  console.log('pantryItemBody')
  console.log(pantryItemBody)
  return PantryItem.create(pantryItemBody);
};

export const getPantryItems = async (userId: string): Promise<IPantryItemDocument> => {
  return PantryItem.find({userId}).lean();
};
