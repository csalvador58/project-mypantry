import { Router } from 'express';
import { loginUser, registerUser, getUsers } from '../controllers/user.controller.js';
import { isPasswordValid, isUsernameValid } from '../utils/index.js';
import { isTokenBlacklisted, isTokenValid } from '../controllers/token.controller.js';

const router = Router();

router.post('/register', isUsernameValid, isPasswordValid, registerUser);
router.post('/login', isUsernameValid, isPasswordValid, loginUser)
router.get('/get', getUsers);
router.get('/test', isTokenValid, isTokenBlacklisted);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
