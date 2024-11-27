import express from 'express';
import {
  createWorkspace,
  getAllWorkspaces,
} from '../controllers/workspaceController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', isAuthenticated, getAllWorkspaces);
router.post('/', isAuthenticated, createWorkspace);

export default router;
