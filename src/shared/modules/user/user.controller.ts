import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { UserService } from './user-service.interface.js';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response, email: string): Promise<void> {
    const users = await this.userService.findByEmail();
    const responseData = fillDTO(UserRdo, users);
    this.ok(res, responseData);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {

    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      const existUserError = new Error(`The user with this email "${body.email}" exists already.`);
      this.send(res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        {error: existUserError.message}
      );

      return this.logger.error(existUserError.message, existUserError);
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }
}
