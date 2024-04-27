import { UserData } from './user-data.type.js';

export type Comment = {
  comment: string;
  date: Date;
  rating: number;
  user: UserData;
 }
