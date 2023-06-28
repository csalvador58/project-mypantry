import Router from 'express';
import { addPantryItem, getPantryItems } from '../controllers/pantryItem.controller';

const router = Router();

router.post('/add', addPantryItem);
router.get('/', getPantryItems)

export default router;