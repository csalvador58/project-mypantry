import { Router } from 'express';

import { registerUser, getUsers } from '../controllers/user.controller';
import { loginUser } from '../controllers/token.controller'

const router = Router();

router.post('/register', registerUser);
router.post('login', loginUser)
router.get('/get', getUsers);
// router.get('/', getUsers);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
