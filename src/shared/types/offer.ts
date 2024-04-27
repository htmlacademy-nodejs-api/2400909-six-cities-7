export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
export type City = {
  name: string;
  location: Location;
}

export type HousingType =
  | 'apartment'
  | 'room'
  | 'house'
  | 'hotel';

export type Offer = {
  id: string;
  title: string;
  type: HousingType;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};
