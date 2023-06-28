import PantryItem, {
  IPantryItem,
  IPantryItemDocument,
} from '../models/pantryItem.model';

export const addPantryItem = async (
  pantryItemBody: IPantryItem
): Promise<IPantryItemDocument> => {
    console.log('pantryItem.service: ')
    console.log('pantryItemBody')
    console.log(pantryItemBody)
  return PantryItem.create(pantryItemBody);
};

export const getPantryItems = async (): Promise<IPantryItemDocument> => {
  return PantryItem.find().lean();
};
