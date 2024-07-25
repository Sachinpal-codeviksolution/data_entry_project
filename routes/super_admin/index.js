import { Router } from "express";
const router=Router();
import superAdmin from './controller/index.js';

import is_superadmin_login from './middleware.js';
import cookieParser from 'cookie-parser';
router.use(cookieParser());

router.get('/dashboard',is_superadmin_login,superAdmin.dashboard);
router.get('/login',superAdmin.loginPage);
router.get('/update/:id',is_superadmin_login,superAdmin.updatepage);
router.get('/userregister',is_superadmin_login,superAdmin.userRegisterPage);
router.get('/staffregister',is_superadmin_login,superAdmin.staffRegisterPage);
// router.get('/sendmail',is_superadmin_login,superAdmin.sendmail);
router.get('/logout', superAdmin.logout);

router.delete('/delete/:id',is_superadmin_login,superAdmin.delete);

router.patch('/update/:id',is_superadmin_login,superAdmin.update);

// router.get('/register',superAdmin.registerPage);
router.get('/register',superAdmin.register);

router.post('/login',superAdmin.login);
router.post('/staffregister',is_superadmin_login,superAdmin.staffRegister);
router.post('/userregister',is_superadmin_login,superAdmin.userRegister);






export default router;
