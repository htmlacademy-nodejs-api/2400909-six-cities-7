import { inject, injectable } from 'inversify';
import { Response, NextFunction } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { CreateUserRequest } from './create-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    _req: CreateUserRequest,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      throw new Error('[UserController] Oops');
    } catch (error) {
      return next(error);
    }
  }
}
