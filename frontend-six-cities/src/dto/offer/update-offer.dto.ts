import { CityType, Goods, HousingType } from "./create-offer.dto";

export type UserData = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  isPro: boolean;
};

export default class UpdateOfferDto {
  public title?: string;

  public description?: string;

  public date?: Date;

  public city?: CityType;

  public photo?: string[];

  public isPremium?: boolean;

  public type?: HousingType;

  public rooms?: number;

  public guests?: number;

  public price?: number;

  public goods?: Goods[];

  public user?: UserData;

  public location?: Location;

  public userId?: string;
}
