export enum CityType {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export type Location = {
  latitude: string;
  longitude: string;
}

export type Goods =
  | 'Wi-Fi'
  | 'Washing machine'
  | 'Towels'
  | 'Coffee machine'
  | 'Baby seat'
  | 'Kitchen'
  | 'Dishwasher'
  | 'Cable TV'
  | 'Fridge'
  | 'Heating';

export type HousingType =
  | 'apartment'
  | 'room'
  | 'house'
  | 'hotel';

export default class CreateOfferDto {
  public title!: string;

  public description!: string;

  public date!: Date;

  public city!: CityType;

  public photo!: string[];

  public isPremium!: boolean;

  public type!: HousingType;

  public rooms!: number;

  public guests!: number;

  public price!: number;

  public goods!: Goods[];

  public location!: Location;

  public userId!: string;
}
