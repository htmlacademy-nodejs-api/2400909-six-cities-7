import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { Types } from 'mongoose';

const addCommentsToOffers = [
  {
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'offerId',
      as: 'comments',
    },
  },
  {
    $addFields: {
      commentCount: {$size: '$comments'},
      rating: {$avg: '$comments.rating'},
    }
  },
  {
    $unset: 'comments'
  },
];

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.aggregate([
      {
        $match: {_id: new Types.ObjectId(offerId)}
      },
      ...addCommentsToOffers,
    ]).exec();

    return result[0] ?? null;
  }

  public async find(limit = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        }
      },
      ...addCommentsToOffers,
      {$sort: {createAt: SortType.Down}},
      {$limit: limit},
    ]).exec();

    return offers;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    const document = await this.offerModel.exists({_id: documentId});
    return document !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({createAt: SortType.Down})
      .limit(count)
      .populate('userId')
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({commentCount: SortType.Down})
      .limit(count)
      .populate('userId')
      .exec();
  }
}
