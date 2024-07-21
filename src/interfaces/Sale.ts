import { Schema, Document } from 'mongoose';

export interface ISale extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  saleDate: Date;
  deliveryDate: Date;
  quantity: number;
  totalAmount: number;
}
