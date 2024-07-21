import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/Product';

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
});

export default model<IProduct>('Product', ProductSchema);
