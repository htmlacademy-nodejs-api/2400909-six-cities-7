import { Schema, Document, model } from 'mongoose';
import { UserData } from '../../types/user-data.type.js';

export interface UserDocument extends UserData, Document {
  createAt: Date,
  updateAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Min length for firstname is 2'],
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarUrl: String,
  password: {
    type: String,
    required: true,
    minlength: [8, 'Min length for password is 8'],
  },
  isPro: Boolean,
}, {timestamps: true});

export const UserModel = model<UserDocument>('UserData', userSchema);
