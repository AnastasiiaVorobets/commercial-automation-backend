import mongoose from 'mongoose';
import config from './default';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export default connectDB;
