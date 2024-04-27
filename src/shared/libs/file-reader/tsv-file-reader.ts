import { readFileSync } from "fs";
import { CityType } from "../../types/city.type.js";
import { Offer, HousingType, Location } from "../../types/offer.js";
import { FileReader } from "./file-reader.intertface.js";


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
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
      location: this.parseLocation(location),
      isFavorite,
      isPremium,
      rating: this.parseRating(rating),
    };
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseRating(ratingString: string): number {
    return Number.parseInt(ratingString, 10);
  }

  private parseLocation(latitude: string, longitude: string, zoom: string): number {
    return Number.parseInt(latitude, 10);
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseSourceDataToOffers();
  }
}
