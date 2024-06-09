import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/common.js';
// import { CreateOfferDto } from './dto/create-offer.dto.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { OfferRdo } from './rdo/offer.rdo.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentService } from '../comment/comment-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
    @inject(Component.CommentService) protected readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments });
  }

  public async show({params}: Request<ParamOfferId>, _res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    // const responseData = fillDTO(OfferRdo, offers);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController',
      );
    }

    this.ok(_res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({body}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController',
      );
    }

    this.noContent(res, offer);
  }

  public async update({body, params}: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updateOffer = await this.offerService.updateById(params.offerId, body);

    if (!updateOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, updateOffer));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} is not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
