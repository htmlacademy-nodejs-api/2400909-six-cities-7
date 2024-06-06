import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { BaseController } from "../../libs/rest/controller/base-controller.abstract.js";
import { Component } from "../../types/component.enum.js";
import { Logger } from "../../libs/logger/logger.interface.js";
import { HttpMethod } from "../../libs/rest/types/http-method.enum.js";

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public index(req: Request, res: Response): void {
    // Код обработчика
  }

  public create(req: Request, res: Response): void {
    // Код обработчика
  }
}
