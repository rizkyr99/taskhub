import { Request, Response } from 'express';
import Project from '../models/Project';
import Workspace from '../models/Workspace';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const workspaceId = req.params.id;

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: 'Workspace ID is required and cannot be empty.',
      });
      return;
    }

    const projects = await Project.find({ workspace: workspaceId });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Project name is required',
      });
      return;
    }

    const workspaceId = req.params.id;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({ success: false, message: 'Workspace not found' });
      return;
    }

    if (workspace.owner.toString() !== userId) {
      res.status(403).json({
        success: false,
        message:
          'You do not have permission to add a project to this workspace',
      });
      return;
    }

    const newProject = new Project({
      name,
      workspace: workspace._id,
    });
    await newProject.save();

    workspace.projects.push(newProject._id);

    await workspace.save();

    res.status(201).json({
      success: true,
      message: 'Success',
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, messsage: 'Error' });
  }
};
