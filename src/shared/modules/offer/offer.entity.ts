import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { CityType } from "../../types/city.type.js";
import { Goods, HousingType, Location } from "../../types/offer.type.js";
import { UserEntity } from "../user/user.entity.js";
import { UserData } from "../../types/user-data.type.js";

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
  public date!: Date;

  @prop({
    type: () => String,
    enum: CityType
  })
  public city!: CityType;

  @prop()
  public previewImage!: string;

  @prop()
  public photo!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    ref: HousingType,
    required: true
  })
  public type!: Ref<HousingType>;

  @prop()
  public rooms!: number;

  @prop()
  public guests!: number;

  @prop()
  public price!: number;

  @prop({
    ref: Goods,
    required: true,
    default: [],
  })
  public goods!: Ref<Goods>[];

  @prop({
    ref: UserData,
    required: true
  })
  public user!: Ref<UserData>;

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: Location,
    required: true,
  })
  public location!: Ref<Location>;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
