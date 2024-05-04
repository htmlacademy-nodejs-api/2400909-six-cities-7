import { CityType } from './city.type.js';
import { UserData } from './user-data.type.js';

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

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: CityType;
  previewImage: string;
  photo: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  guests: number;
  price: number;
  goods: Goods[];
  user: UserData;
  comments: number;
  location: Location;
};
