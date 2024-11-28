import express, { Request, Response } from 'express';
import 'dotenv/config';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with Typescript');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workspaces', workspaceRoutes);
app.use('/api/v1/workspaces', projectRoutes);
app.use(
  '/api/v1/workspaces/:workspaceId/projects/:projectId/tasks',
  taskRoutes
);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
