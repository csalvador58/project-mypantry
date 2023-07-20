import Router from 'express'
import { isTokenBlacklisted, isTokenValid } from '../controllers/token.controller.js';
import { getSaleItemsCount, getStore01SalesFromDB, updateStore01SalesFromApi } from '../controllers/sales.controller.js';

const router = Router();

router.get('/', isTokenValid, isTokenBlacklisted, getStore01SalesFromDB);
router.put('/update', isTokenValid, isTokenBlacklisted, updateStore01SalesFromApi);
router.get('/count', isTokenValid, isTokenBlacklisted, getSaleItemsCount)

export default router;