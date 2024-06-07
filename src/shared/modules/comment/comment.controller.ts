import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { CommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/errors/http-error.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) protected readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index({params}: Request, res: Response): Promise<void> {
    const comment = await this.commentService.findByOfferId(params.offerId);
    const responseData = fillDTO(CommentRdo, comment);
    this.ok(res, responseData);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const existComment = await this.commentService.findByOfferId(body.offerId);

    if (existComment) {
      throw new HttpError (
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Comment by this offer "${body.offerId}" exists.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
