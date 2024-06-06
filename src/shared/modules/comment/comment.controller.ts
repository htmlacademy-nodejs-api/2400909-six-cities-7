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

  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId();
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const existComment = await this.commentService.findByOfferId(body.offerId);

    if (existComment) {
      const existCommentError = new Error(`Comment for this offer "${body.offerId}" exists.`);
      this.send(res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        {error: existCommentError.message}
      );

      return this.logger.error(existCommentError.message, existCommentError);
    }

    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
