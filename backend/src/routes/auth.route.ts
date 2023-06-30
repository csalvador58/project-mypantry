import { Router } from 'express';
import { isUsernameValid, isPasswordValid } from '../controllers/validate.controller';
import { registerUser, getUsers } from '../controllers/user.controller';
import { loginUser, validateToken } from '../controllers/token.controller'

const router = Router();

router.post('/register', isUsernameValid, isPasswordValid, registerUser);
router.post('/login', isUsernameValid, isPasswordValid, loginUser)
router.get('/get', getUsers);
router.get('/test', validateToken);
// router.put('/', updateUser);
// router.delete('/', deleteUser);

export default router;
