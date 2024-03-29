import Router from 'express';
import { addPantryItem, deletePantryItem, getPantryItems, getPantryItemsCount, updatePantryItem } from '../controllers/pantryItem.controller.js';
import { isTokenBlacklisted, isTokenValid } from '../controllers/token.controller.js';
import { validateInputs } from '../utils/validateInputs.js';

const router = Router();

router.post('/add', isTokenValid, isTokenBlacklisted, addPantryItem);
router.get('/', isTokenValid, isTokenBlacklisted, getPantryItems)
router.get('/count', isTokenValid, isTokenBlacklisted, getPantryItemsCount)
router.get('/:id', isTokenValid, isTokenBlacklisted, getPantryItems)
router.put('/:id', isTokenValid, isTokenBlacklisted, validateInputs,updatePantryItem)
router.delete('/:id', isTokenValid, isTokenBlacklisted, deletePantryItem)

export default router;