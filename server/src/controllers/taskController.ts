import { Request, Response } from 'express';
import Task from '../models/Task';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { workspaceId, projectId } = req.params;

    if (!workspaceId || !projectId) {
      res.status(400).json({
        success: false,
        message: 'Both workspaceId and projectId are required.',
      });
      return;
    }

    const tasks = await Task.find({
      workspaceId,
      projectId,
    });

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching tasks.',
    });
  }
};
