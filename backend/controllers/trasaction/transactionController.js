import pool from "../../libs/db.js";

export const transactionAdd = async (req, res) => {
  const { account_id, amount, description, source, type } = req.body;
  const userId = req.user.id;

  try {
    const accountRes = await pool.query(
      'SELECT * FROM tbaccount WHERE id = $1 AND user_id = $2',
      [account_id, userId]
    );
console.log('account_id', account_id)
    if (accountRes.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const currentBalance = parseFloat(accountRes.rows[0].account_balance);
    const transactionAmount = parseFloat(amount);
    let newBalance;

    if (type === 'expense') {
      if (transactionAmount > currentBalance) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
      newBalance = currentBalance - transactionAmount;
    } else {
      newBalance = currentBalance + transactionAmount;
    }

    await pool.query(
      'UPDATE tbaccount SET account_balance = $1, updatedAt = CURRENT_TIMESTAMP WHERE id = $2',
      [newBalance, account_id]
    );

    await pool.query(
      `INSERT INTO tbtransaction 
        (user_id, account_id, description, status, source, ammount, type)
       VALUES 
        ($1, $2, $3, 'completed', $4, $5, $6)`,
      [userId, account_id, description, source, transactionAmount, type]
    );

    res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    console.error('Transaction add error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const transactionGet = async (req, res) => {
  const userId = req.user.id;
  const body = req.body;
  console.log('body', body)
// console.log('req.query', Object.keys(req.query)[0])
  // Extract the first query key as the search term
  const searchKey = Object.keys(req.query)[0];
  const searchValue = searchKey || '';
const from = req.body.startDate;
const to = req.body.endDate ;
console.log('from', from)
console.log('to', to)
console.log('searchValue', searchValue)
  // console.log('Search value:', searchValue);
  if (searchValue && searchValue.split(/\s+/).length > 30) {
    return res.status(400).json({ error: 'Search query too vague or invalid' });
  }
  try {
    let query = `SELECT * FROM tbtransaction WHERE user_id = $1`;

    const values = [userId];
    let paramIndex = 2;

    if (searchValue) {
      query += ` AND (source ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      values.push(`%${searchValue}%`);
      paramIndex++;
    }
    if (from) {
      query += ` AND createdat >= $${paramIndex}`;
      values.push(from);
      paramIndex++;
    }

    if (to) {
      query += ` AND createdat <= $${paramIndex}`;
      values.push(to);
      paramIndex++;
    }
    query += ' ORDER BY createdAt DESC';
    console.log('query', query)

    const transactionRes = await pool.query(query, values);

    res.status(200).json({
      data: transactionRes.rows,
      message: 'Transaction fetched successfully',
    });
  } catch (err) {
    console.error('Transaction fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getMonthlyGraphData = async (req, res) => {
  const userId = req.user.id;

  try {
    const graphRes = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', createdAt), 'Mon') AS month,
        type,
        SUM(ammount) AS total
      FROM tbtransaction
      WHERE user_id = $1
      GROUP BY month, type
      ORDER BY month ASC
    `, [userId]);
console.log('graphRes', graphRes)
    // Structure the response as: [{ month: '2025-01', income: 500, expense: 200 }, ...]
    const summaryMap = {};

    for (const row of graphRes.rows) {
      const month = row.month;
      console.log('summaryMap[month]', summaryMap[month])
      if (!summaryMap[month]) {
        summaryMap[month] = { month, income: 0, expense: 0 };
      }
      console.log('summaryMap[month][row.type]', summaryMap[month][row.type])
      summaryMap[month][row.type] = parseFloat(row.total);
    }

    const graphData = Object.values(summaryMap);

    res.status(200).json({ data: graphData, message: "Monthly graph data fetched successfully" });
  } catch (err) {
    console.error('Graph data error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


