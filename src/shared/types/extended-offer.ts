import { Location, City, HousingType } from './offer.js';

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type Goods =
  | 'Wi-Fi'
  | 'Washing machine'
  | 'Towels'
  | 'Coffee machine'
  | 'Baby seat'
  | 'Kitchen'
  | 'Dishwasher'
  | 'Cabel TV'
  | 'Fridge'
  | 'Heating';


export type ExtendedOffer = {
  id: string;
  title: string;
  type: HousingType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: Goods[];
  host: Host;
  images: string[];
  maxAdults: number;
};
