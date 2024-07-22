import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  isPermanentCustomer: boolean;
  role: 'admin' | 'customer';
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
