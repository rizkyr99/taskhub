import express from 'express';
import {
  createTask,
  getAllTasks,
  validateTask,
} from '../controllers/taskController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router({ mergeParams: true });

router.get('/', isAuthenticated, getAllTasks);
router.post('/', isAuthenticated, validateTask, createTask);

export default router;
