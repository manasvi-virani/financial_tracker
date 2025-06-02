import express from 'express';
import { body, validationResult } from 'express-validator';
import {createAccount, getAccount, getAccountSummary} from '../../controllers/account/accountController.js';
import { authenticateToken } from '../../middlewares/authMiddleware.js';

const accountRouter = express.Router();

const validateAccount = [
  body('account_number')
    .notEmpty().withMessage('Account number is required')
    .isNumeric().withMessage('Account number must be numeric'),
  body('account_name')
    .notEmpty().withMessage('Account name is required'),
  body('account_balance')
    .notEmpty().withMessage('Balance is required')
    .isFloat({ min: 0 }).withMessage('Balance must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Protected Route
accountRouter.post('/create', authenticateToken, validateAccount, createAccount);
accountRouter.get('/get', authenticateToken, getAccount);
accountRouter.get('/summary', authenticateToken, getAccountSummary); 


export default accountRouter;
