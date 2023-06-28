import Router from 'express';
import { addPantryItem } from '../controllers/pantryItem.controller';

const router = Router();

router.post('/add', addPantryItem);

export default router;