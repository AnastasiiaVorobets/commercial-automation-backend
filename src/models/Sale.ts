import { Schema, model } from 'mongoose';
import { ISale } from '../interfaces/Sale';

const SaleSchema = new Schema<ISale>({
  product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  saleDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number },
});

SaleSchema.post('save', async function (doc) {
  const User = model('User');
  const user = await User.findById(doc.user);
  
  const totalAmountSpent = await model('Sale').aggregate([
    { $match: { user: user._id } },
    { $group: { _id: '$user', totalAmount: { $sum: '$amount' } } }
  ]);

  if (totalAmountSpent[0].totalAmount > 5000) {
    user.isPermanentClient = true;
    await user.save();
  }
});

export default model<ISale>('Sale', SaleSchema);
