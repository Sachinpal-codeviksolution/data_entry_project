import { Router } from "express";
const router=Router();
import staff from './controller/index.js';
import is_staff_login from './middleware.js';
import cookieParser from 'cookie-parser';
router.use(cookieParser());

router.get('/dashboard',is_staff_login,staff.dashboard);
router.get('/add',staff.add);
router.get('/update/:id',staff.updatepage);
router.post('/login',staff.login);
router.get('/login',staff.loginPage);
router.get('/logout',staff.logout);







router.post('/register',is_staff_login,staff.register);
router.delete('/delete/:id',staff.delete);
router.patch('/update/:idd',staff.update);
// router.get('/sendmail',staff.sendmail);

export default router;
