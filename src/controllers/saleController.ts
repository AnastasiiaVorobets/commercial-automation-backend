import { Request, Response } from 'express';
import Sale from '../models/Sale';
import Product from '../models/Product';
import User from '../models/User';

export const getSales = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sales = await Sale.find().populate('product').populate('user');
    return res.json(sales);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const getSaleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sale = await Sale.findById(req.params.id).populate('product').populate('customer');
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.json(sale);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const createSale = async (req: Request, res: Response): Promise<Response> => {
  const { product, user, saleDate, deliveryDate, quantity, totalAmount } = req.body;
  
  console.log('Request body:', req.body);

  try {
    const foundProduct = await Product.findById(product);
    const foundUser = await User.findById(user);

    if (!foundProduct) {
      console.log('Product not found:', product);
      return res.status(404).json({ message: 'Product not found' });
    }
    if (!foundUser) {
      console.log('Customer not found:', user);
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newSale = new Sale({ product, user, saleDate, deliveryDate, quantity, totalAmount });
    await newSale.save();
    return res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const updateSale = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { product, customer, saleDate, deliveryDate, quantity, totalAmount } = req.body;
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { product, customer, saleDate, deliveryDate, quantity, totalAmount },
      { new: true, runValidators: true }
    );
    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.json(updatedSale);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const deleteSale = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.json({ message: 'Sale deleted', sale: deletedSale });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};
