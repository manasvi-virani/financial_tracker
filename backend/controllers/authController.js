import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../libs/db.js';
// import dotenv from 'dotenv';

// dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { email, password, firstname, lastname, contact, country, currency } = req.body;

  try {
    // Check if user already exists
    const existing = await pool.query('SELECT * FROM tbuser WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO tbuser (email, password, firstname, lastname, contact, country, currency)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, firstname, lastname`,
      [email, hashedPassword, firstname, lastname, contact, country, currency]
    );

    // 🔐 Generate JWT Token using the newly created user
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({ user: { ...user, token }, message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM tbuser WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ user:{ id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, currency:user.currency, token }, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    // Step 1: Find user by email
    const result = await pool.query('SELECT * FROM tbuser WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Step 2: Compare current password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    // Step 3: Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: Update password in DB
    await pool.query(
      'UPDATE tbuser SET password = $1, updatedAt = CURRENT_TIMESTAMP WHERE email = $2',
      [hashedNewPassword, email]
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};