import { IsOptional, IsString,
  MinLength, MaxLength,
  IsDateString, IsInt,
  IsArray, ArrayMinSize,
  ArrayMaxSize, Min, Max,
  IsBoolean, IsMongoId } from 'class-validator';
import { CityType } from '../../../types/city.type.js';
import { Goods, HousingType, Location } from '../../../types/offer.type.js';
import { UserData } from '../../../types/user-data.type.js';
import { UpdateOfferMessages } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferMessages.title.minLength })
  @MaxLength(100, { message: UpdateOfferMessages.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferMessages.description.minLength })
  @MaxLength(1024, { message: UpdateOfferMessages.description.maxLength })
  public description?: string;

  @IsDateString({}, { message: UpdateOfferMessages.date.invalidFormat })
  public date?: Date;

  @IsOptional()
  @IsString()
  public city?: CityType;

  public previewImage?: string;

  @IsOptional()
  @IsString({each: true})
  @IsArray({ message: UpdateOfferMessages.images.invalidFormat })
  @ArrayMinSize(6, { message: UpdateOfferMessages.images.arrayMinSize })
  @ArrayMaxSize(6, { message: UpdateOfferMessages.images.arrayMaxSize })
  public photo?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferMessages.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsString({ message: UpdateOfferMessages.type.invalid})
  public type?: HousingType;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessages.bedrooms.invalidFormat })
  @Min(1, { message: UpdateOfferMessages.bedrooms.minValue })
  @Max(8, { message: UpdateOfferMessages.bedrooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessages.maxAdults.invalidFormat })
  @Min(1, { message: UpdateOfferMessages.maxAdults.minValue })
  @Max(10, { message: UpdateOfferMessages.maxAdults.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessages.price.invalidFormat })
  @Min(100, { message: UpdateOfferMessages.price.minValue })
  @Max(200000, { message: UpdateOfferMessages.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsString({each: true})
  public goods?: Goods[];

  @IsOptional()
  @IsString()
  public user?: UserData;

  @IsOptional()
  @IsString()
  public location?: Location;

  @IsMongoId({ message: UpdateOfferMessages.userId.invalidId })
  public userId?: string;
}
