import { Expose } from 'class-transformer';
import { CityType } from '../../../types/city.type.js';
import { Goods, HousingType, Location } from '../../../types/offer.type.js';
import { UserData } from '../../../types/user-data.type.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: CityType;

  @Expose()
  public previewImage: string;

  @Expose()
  public photo: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public type: HousingType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: Goods[];

  @Expose()
  public user: UserData;

  @Expose()
  public location: Location;

  @Expose()
  public userId: string;
}
