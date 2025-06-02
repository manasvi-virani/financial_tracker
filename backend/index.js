import cors from 'cors';
import express from 'express';  
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: process.env.CORS_ORIGIN || '*'}));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//   res.status(200).json({ message: 'Hello, Manasvi! Your API is working 🎉' });
// });
app.use('/api-v1', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});