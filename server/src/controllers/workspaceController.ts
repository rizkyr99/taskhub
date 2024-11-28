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

export const addMemberToWorkspace = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'User ID is required.',
      });
      return;
    }

    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({
        success: false,
        message: 'Workspace not found',
      });
      return;
    }

    const isAuthorized = workspace.owner.toString() === user.id;
    if (!isAuthorized) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to add members to this workspace.',
      });
      return;
    }

    if (workspace.members.includes(userId)) {
      res.status(400).json({
        success: false,
        message: 'The user is already a member of this workspace.',
      });
      return;
    }

    workspace.members.push(userId);
    await workspace.save();

    res.status(200).json({
      success: true,
      message: 'User added to workspace successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        'An error occurred while adding the user to the workspace. Please try again later.',
    });
  }
};
