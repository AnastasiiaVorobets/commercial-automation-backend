import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const { name, price, unit } = req.body;
  try {
    const newProduct = new Product({ name, price, unit });
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, price, unit } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, unit },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(updatedProduct);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ message: 'Product deleted', product: deletedProduct });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Server Error', error: 'Unknown error' });
  }
};
