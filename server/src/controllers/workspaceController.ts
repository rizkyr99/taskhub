import { Request, Response } from 'express';
import Workspace from '../models/Workspace';
import User from '../models/User';

export const getAllWorkspaces = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const workspaces = await Workspace.find({ owner: userId });

    res.status(200).json({
      success: true,
      message: 'Workspaces fetched successfully',
      data: workspaces,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching workspaces',
    });
  }
};

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Workspace name is required',
      });
      return;
    }

    const newWorkspace = new Workspace({
      name,
      owner: userId,
    });
    await newWorkspace.save();

    await User.findByIdAndUpdate(userId, {
      $push: { workspaces: newWorkspace._id },
    });

    res.status(201).json({
      success: true,
      message: 'Workspace created successfully',
      workspace: newWorkspace,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
};
