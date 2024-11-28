import express from 'express';
import {
  createProject,
  getAllProjects,
} from '../controllers/projectController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:id/projects', isAuthenticated, getAllProjects);
router.post('/:id/projects', isAuthenticated, createProject);

export default router;
