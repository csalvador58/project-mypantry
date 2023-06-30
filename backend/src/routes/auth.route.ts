import { Router } from 'express';

import { registerUser, getUsers } from '../controllers/user.controller';
import { loginUser, validateToken } from '../controllers/token.controller'

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/get', getUsers);
router.get('/test', validateToken);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
