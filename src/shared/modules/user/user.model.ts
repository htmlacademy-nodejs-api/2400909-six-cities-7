import { Schema, Document, model } from 'mongoose';
import { UserData } from '../../types/user-data.type.js';

export interface UserDocument extends UserData, Document {
  createAt: Date,
  updateAt: Date,
}

const userSchema = new Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
