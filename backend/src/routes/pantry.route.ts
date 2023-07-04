import Router from 'express';
import { addPantryItem, deletePantryItem, getPantryItems } from '../controllers/pantryItem.controller';
import { isTokenBlacklisted, isTokenValid } from '../controllers/token.controller';

const router = Router();

router.post('/add', isTokenValid, isTokenBlacklisted, addPantryItem);
router.get('/', isTokenValid, isTokenBlacklisted, getPantryItems)
router.get('/:id', isTokenValid, isTokenBlacklisted, getPantryItems)
router.delete('/:id', isTokenValid, isTokenBlacklisted, deletePantryItem)

export default router;