import { Schema, Document, model } from 'mongoose';
import { UserData } from '../../types/user-data.type.js';

export interface UserDocument extends UserData, Document {
  createAt: Date,
  updateAt: Date,
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarPath: {
    type: String,
    required: true,
    minlength: [5, 'Min length for avatar path is 5'],
  },
  firstname: {
    type: String,
    required: true,
    minlength: [2, 'Min length for firstname is 2'],
  },
  lastname: String,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
