import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email is already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error registering user' });
  }
};
