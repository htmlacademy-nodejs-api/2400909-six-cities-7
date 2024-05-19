import { Logger as PinoInstance, pino, transport } from 'pino';
import { injectable } from 'inversify';

import { Logger } from './logger.interface.js';

import { getCurrentModuleDirectoryPath } from '../../helpers/file-system.js';
import { resolve } from 'node:path';

@injectable()
export class PinoLogger implements Logger {
  private readonly multiTransport = transport({
    targets: [
      {
        target: 'pino/file',
        options: { destination: resolve(getCurrentModuleDirectoryPath(), '../../../', 'logs/rest.log') },
        level: 'debug'
      },
      {
        target: 'pino/file',
        level: 'info',
        options: {}
      },
    ],
  });

  private readonly logger = pino({}, this.multiTransport);

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
