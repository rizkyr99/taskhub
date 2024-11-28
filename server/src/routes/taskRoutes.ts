import express from 'express';
import { getAllTasks } from '../controllers/taskController';

const router = express.Router({ mergeParams: true });

router.get('/', getAllTasks);

export default router;
