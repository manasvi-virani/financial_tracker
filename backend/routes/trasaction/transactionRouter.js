import express from 'express';
import { body, validationResult } from 'express-validator';
import { getMonthlyGraphData, transactionAdd, transactionGet } from '../../controllers/trasaction/transactionController.js';
import { authenticateToken } from '../../middlewares/authMiddleware.js';

const transactionRouter = express.Router();

// Validation middleware for transaction
const validateTransaction = [
  body('account_id')
    .notEmpty().withMessage('Account ID is required')
    .isInt().withMessage('Account ID must be an integer'),

  body('amount')  // Still maps to DB column `ammount`
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),

  body('description')
    .notEmpty().withMessage('Description is required'),

  body('source')
    .notEmpty().withMessage('Source is required'),

  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['income', 'expense']).withMessage('Type must be either "income" or "expense"'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Protected route to add a transaction
transactionRouter.post('/add', authenticateToken, validateTransaction, transactionAdd);
transactionRouter.get('/get', authenticateToken, transactionGet);
transactionRouter.get('/trasaction_activity', authenticateToken, getMonthlyGraphData);


export default transactionRouter;
