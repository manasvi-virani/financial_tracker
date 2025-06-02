import pool from "../../libs/db.js";


export const createAccount = async (req, res) => {
  const { account_number, account_name, account_balance } = req.body;
  const userId = req.user.id;

  try {
    const existing = await pool.query(
      'SELECT * FROM tbaccount WHERE account_number = $1 AND user_id = $2',
      [account_number, userId]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Account already exists for this user' });
    }
    const result = await pool.query(
      `INSERT INTO tbaccount (account_number, account_name, account_balance, user_id)
       VALUES ($1, $2, $3, $4)`,
      [account_number, account_name, account_balance, userId]
    );
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error('Account creation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAccount = async (req, res) => {
  const userId = req.user.id;

  try {
 const result = await pool.query(
      `SELECT id, account_number, account_name, account_balance, createdat, updatedat
       FROM tbaccount
       WHERE user_id = $1
       ORDER BY createdat DESC`,
      [userId]
    );
    res.status(200).json({ userId, accounts: result.rows });
  } catch (err) {
    console.error('Account creation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAccountSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch total income and expense
    const summaryRes = await pool.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN ammount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN ammount ELSE 0 END) AS total_expense
      FROM tbtransaction
      WHERE user_id = $1
    `, [userId]);

    // Fetch available balance from all user accounts
    const balanceRes = await pool.query(`
      SELECT COALESCE(SUM(account_balance), 0) AS available_balance
      FROM tbaccount
      WHERE user_id = $1
    `, [userId]);

    res.status(200).json({
      total_income: parseFloat(summaryRes.rows[0].total_expense) + parseFloat (balanceRes.rows[0].available_balance || 0),
      total_expense: parseFloat(summaryRes.rows[0].total_expense || 0),
      available_balance: parseFloat(balanceRes.rows[0].available_balance || 0),
      message: "Summary fetched successfully"
    });

  } catch (err) {
    console.error('Summary fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

