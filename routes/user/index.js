import { Router } from "express";
const router = Router();
import user from './controller/index.js';
import is_user_login from './middleware.js';
import cookieParser from 'cookie-parser';
router.use(cookieParser());

router.get('/dashboard',is_user_login,user.dashboard);
router.get('/login',user.loginPage);
router.get('/update/:id',is_user_login,user.updatepage);
router.get('/logout', user.logout);

router.patch('/update/:idd',is_user_login,user.update);
router.post('/login',user.login);



export default router;
