import { Router } from "express";
const router=Router();
import superadmninRouter from './super_admin/index.js';
import staffRouter from './staff/index.js';
import userRouter from './user/index.js'


router.use('/superadmin',superadmninRouter);
router.use('/staff',staffRouter);
router.use('/user',userRouter);





export default router;