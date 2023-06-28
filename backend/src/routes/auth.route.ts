import { Router } from 'express';

import { registerUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.get('/get', getUsers);
// router.get('/', getUsers);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
