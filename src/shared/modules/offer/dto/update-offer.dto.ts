import { CityType } from "../../../types/city.type.js";
import { Goods, HousingType, Location } from "../../../types/offer.type.js";
import { UserData } from "../../../types/user-data.type.js";

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: CityType;
  public previewImage?: string;
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
