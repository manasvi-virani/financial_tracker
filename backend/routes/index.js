import express from 'express';
import authRouter from "./authRouter.js";
import accountRouter from './account/accountRouter.js';
import transactionRouter from './trasaction/transactionRouter.js';

// const 
const router = express.Router();
router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/transaction', transactionRouter);
export default router;