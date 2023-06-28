import { Router } from 'express';

import { createUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.post('/create', createUser);
router.post('/get', getUsers);
// router.get('/', getUsers);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
