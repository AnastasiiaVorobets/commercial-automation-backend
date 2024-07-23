import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || '';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, middleName, address, phone, email, password, role, isPermanentCustomer } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      middleName,
      address,
      phone,
      email,
      password,
      role,
      isPermanentCustomer,
    });

    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registerUser:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        isPermanentCustomer: user.isPermanentCustomer,
      },
    };

    return new Promise<Response>((resolve, reject) => {
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.json({ token, user: payload.user }));
          }
        }
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};
