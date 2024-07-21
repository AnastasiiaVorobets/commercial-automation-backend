import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
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

export const createUser = async (req: Request, res: Response): Promise<Response> => {
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
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstName, lastName, middleName, address, phone, email, password, role, isPermanentCustomer } = req.body;

    const updateData: { [key: string]: any } = {
      firstName,
      lastName,
      middleName,
      address,
      phone,
      email,
      role,
      isPermanentCustomer,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted', user: deletedUser });
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

export const changeUserRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    return res.json({ message: 'User role updated', user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};
