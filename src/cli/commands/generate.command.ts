import got from 'got';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import { CommandType } from './const.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return CommandType.Generate;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.

    try {
      await this.load(url);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
