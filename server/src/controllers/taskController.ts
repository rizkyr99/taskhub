import { Request, Response } from 'express';
import { check, ValidationError, validationResult } from 'express-validator';
import Task from '../models/Task';
import Workspace from '../models/Workspace';
import Project from '../models/Project';

export const validateTask = [
  check('title')
    .notEmpty()
    .withMessage('Title is required.')
    .isString()
    .withMessage('Title must be a string.')
    .trim(),
  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),
  check('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done'])
    .withMessage("Status must be one of 'todo', 'in-progress', 'done'."),
  check('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage("Priority must be one of 'low', 'medium', 'high'."),
  check('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date.'),
];

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

export const createTask = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array().map((err: ValidationError) => ({
          field: err.type === 'field' ? err.path : err.type,
          message: err.msg,
        })),
      });
      return;
    }

    const { workspaceId, projectId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    if (!workspaceId || !projectId) {
      res.status(400).json({
        success: false,
        message: 'Both workspaceId and projectId are required.',
      });
      return;
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({
        success: false,
        message: 'Workspace not found.',
      });
      return;
    }

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
      return;
    }

    const userId = req.user.id;
    if (!workspace.members.includes(userId)) {
      res.status(403).json({
        success: false,
        message:
          'You do not have permission to create tasks in this workspace.',
      });
      return;
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      workspaceId,
      projectId,
    });
    await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task successfully created.',
      data: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating task.',
    });
  }
};
