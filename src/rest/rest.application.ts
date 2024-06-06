import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/component.enum.js';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`
    );
  }
}