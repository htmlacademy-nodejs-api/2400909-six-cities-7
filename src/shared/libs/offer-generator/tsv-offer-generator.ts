import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../../helpers/common.js';

const FIRST_WEEK_DAY = 1 as const;
const LAST_WEEK_DAY = 7 as const;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    // const date = getRandomItem<string>(this.mockData.date);
    const city = getRandomItem<string>(this.mockData.city);
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const photo = getRandomItems<string>(this.mockData.photo).join(';');
    const isPremium = getRandomItem<string>(this.mockData.isPremium);
    const isFavorite = getRandomItem<string>(this.mockData.isFavorite);
    const rating = getRandomItem(this.mockData.rating).toString();
    const type = getRandomItem<string>(this.mockData.type);
    const rooms = getRandomItem(this.mockData.rooms).toString();
    const guests = getRandomItem(this.mockData.guests).toString();
    const price = getRandomItem(this.mockData.price).toString();
    const goods = getRandomItem<string>(this.mockData.goods);
    const user = getRandomItems<string>(this.mockData.user);
    const location = getRandomItems(this.mockData.location).toString();

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY),
        'day')
      .toISOString();

    return [
      title, description, createdDate,
      city, previewImage, photo,
      isPremium, isFavorite, rating,
      type, rooms, guests,
      price, goods, user, location
    ].join('\t');
  }
}
