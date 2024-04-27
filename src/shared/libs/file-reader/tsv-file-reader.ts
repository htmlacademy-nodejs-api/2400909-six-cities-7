import { readFileSync } from 'node:fs';
import { CityType } from '../../types/city.type.js';
import { Offer, HousingType, Location } from '../../types/offer.js';
import { FileReader } from './file-reader.intertface.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string | boolean
  ) {}

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
      id,
      title,
      type,
      price,
      previewImage,
      city,
      location,
      isFavorite,
      isPremium,
      rating
    ] = row.split('\t');

    return {
      id,
      title,
      type: type as HousingType,
      price: this.parsePrice(price),
      previewImage,
      city: city as CityType,
      location: {latitude, longitude, zoom},
      isFavorite: this.parseIsFavorite(isFavorite),
      isPremium: this.parseIsPremium(isPremium),
      rating: this.parseRating(rating),
    };
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseRating(ratingString: string): number {
    return Number.parseFloat(ratingString);
  }

  private parseIsFavorite(isFavoriteString: string): boolean {
    return Boolean.parseInt(isFavoriteString);
  }

  private parseIsPremium(isPremiumString: string): boolean {
    return Boolean.parseInt(isPremiumString);
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseSourceDataToOffers();
  }
}
