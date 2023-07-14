import Router from 'express'
import { isTokenBlacklisted, isTokenValid } from '../controllers/token.controller';
import { getStore01Deals } from '../controllers/deals.controller';

const router = Router();

router.get('/', isTokenValid, isTokenBlacklisted, getStore01Deals);

export default router;