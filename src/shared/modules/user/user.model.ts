import { Schema, Document, model } from 'mongoose';
import { UserData } from '../../types/user-data.type.js';

export interface UserDocument extends UserData, Document {}

const userSchema = new Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
