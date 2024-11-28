import express from 'express';
import {
  addMemberToWorkspace,
  createWorkspace,
  getAllWorkspaces,
} from '../controllers/workspaceController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', isAuthenticated, getAllWorkspaces);
router.post('/', isAuthenticated, createWorkspace);
router.post('/:workspaceId/members', isAuthenticated, addMemberToWorkspace);

export default router;
