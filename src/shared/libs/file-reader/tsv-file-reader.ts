import EventEmitter from 'node:events';

import { CityType } from '../../types/city.type.js';
import { Offer, HousingType, Goods } from '../../types/offer.type.js';
import { FileReader } from './file-reader.interface.js';


export class TSVFileReader extends EventEmitter implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseSourceDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim())
      .map((row) => this.parseRowToOffer(row));
  }

  private parseRowToOffer(row: string): Offer {
    const [
      title,
      description,
      date,
      city,
      previewImage,
      photo,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      goods,
      userName,
      email,
      avatarUrl,
      password,
      isPro,
      comments,
      latitude,
      longitude
    ] = row.split('\t');

    return {
      title,
      description,
      date: new Date(date),
      city: city as CityType,
      previewImage,
      photo: photo.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: parseFloat(rating),
      type: type as HousingType,
      rooms: parseInt(rooms, 10),
      guests: parseInt(guests, 10),
      price: parseInt(price, 10),
      goods: goods.split(';') as Goods[],
      user: {name: userName, email, avatarUrl, password, isPro: isPro === 'true'},
      comments: parseInt(comments, 10),
      location: {latitude, longitude}
    };
  }

  public read(): void {
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseSourceDataToOffers();
  }
}
