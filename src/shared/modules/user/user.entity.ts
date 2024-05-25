import { UserData } from "../../types/user-data.type.js";

export class UserEntity implements UserData {
  public name: string;
  public email: string;
  public avatarUrl: string;
  public password: string;
  public isPro: boolean;
}
