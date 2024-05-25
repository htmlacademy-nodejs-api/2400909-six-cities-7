import { defaultClasses, getModelForClass, prop } from "@typegoose/typegoose";

import { UserData } from "../../types/user-data.type.js";

export class UserEntity extends defaultClasses.TimeStamps implements UserData {
  @prop({required: true})
  public name: string;

  @prop({unique: true, required: true})
  public email: string;

  @prop({unique: true, required: false, default: ''})
  public avatarUrl: string;

  @prop({required: true})
  public password: string;

  @prop({required: true})
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);
