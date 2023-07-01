import { Router } from 'express';
import { isUsernameValid, isPasswordValid, isTokenValid } from '../errors/validateHandler';
import { loginUser, registerUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.post('/register', isUsernameValid, isPasswordValid, registerUser);
router.post('/login', isUsernameValid, isPasswordValid, loginUser)
router.get('/get', getUsers);
router.get('/test', isTokenValid);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
