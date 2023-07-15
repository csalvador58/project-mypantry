import Router from 'express'
import { isTokenBlacklisted, isTokenValid } from '../controllers/token.controller';
import { getStore01SalesFromDB } from '../controllers/sales.controller';
import { getSaleItemsCount } from '../services/saleItem.service';

const router = Router();

router.get('/', isTokenValid, isTokenBlacklisted, getStore01SalesFromDB);
router.get('/count', isTokenValid, isTokenBlacklisted, getSaleItemsCount)

export default router;