import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { CityType } from '../../types/city.type.js';
import { Goods, HousingType, Location } from '../../types/offer.type.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public date: Date;

  @prop({
    type: () => String,
    enum: CityType
  })
  public city: CityType;

  @prop()
  public previewImage: string;

  @prop()
  public photo: string[];

  @prop()
  public isPremium: boolean;

  @prop({
    required: true
  })
  public type!: HousingType;

  @prop()
  public rooms: number;

  @prop()
  public guests: number;

  @prop()
  public price: number;

  @prop({
    required: true,
    default: [],
  })
  public goods: Goods[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public user!: Ref<UserEntity>;

  @prop({
    required: true,
  })
  public location: Location;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
