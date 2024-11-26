import express, { Request, Response } from 'express';
import 'dotenv/config';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with Typescript');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
