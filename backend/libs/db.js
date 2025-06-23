// import pg from 'pg';
import dotenv from 'dotenv';    
import { Pool } from 'pg';
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render's PostgreSQL requires SSL
  },
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

export default pool;