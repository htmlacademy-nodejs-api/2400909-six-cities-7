import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const city = getRandomItem(this.mockData.city);
    const previewImage = getRandomItem(this.mockData.previewImage);
    const photo = getRandomItems(this.mockData.photo).join(';');
    const isPremium = getRandomItem(this.mockData.isPremium);
    const isFavorite = getRandomItem(this.mockData.isFavorite);
    const rating = getRandomItem(this.mockData.rating).toString();
    const type = getRandomItem(this.mockData.type);
    const rooms = getRandomItem(this.mockData.rooms).toString();
    const guests = getRandomItem(this.mockData.guests).toString();
    const price = getRandomItem(this.mockData.price).toString();
    const goods = getRandomItem(this.mockData.goods);
    const user = getRandomItems(this.mockData.user);
    const location = getRandomItems(this.mockData.location).join(';');

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
