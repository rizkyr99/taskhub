import express, { Request, Response } from 'express';
import 'dotenv/config';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with Typescript');
});

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
