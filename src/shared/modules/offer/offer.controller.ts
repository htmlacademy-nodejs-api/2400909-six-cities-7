import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
// import { OfferService } from './offer-service.interface.js';
// import { fillDTO } from '../../helpers/common.js';
// import { OfferRdo } from './rdo/offer.rdo.js';
// import { CreateOfferDto } from './dto/create-offer.dto.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    // @inject(Component.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    // this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
  }

  public async show(_req: Request, _res: Response): Promise<void> {
    // const offers = await this.offerService.find();
    // const responseData = fillDTO(OfferRdo, offers);
    // this.ok(res, responseData);

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }

  // public async create(
  //   {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
  //   res: Response
  // ): Promise<void> {

  //   const result = await this.offerService.create(body);
  //   this.created(res, fillDTO(OfferRdo, result));
  // }
}
