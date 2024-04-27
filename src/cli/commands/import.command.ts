import { Command } from './command.interface.js';
import { CommandType } from './const.js';

export class ImportCommand implements Command {
  public getName(): string {
    return CommandType.Import;
  }

  public execute(...parameters: string[]): void {
    // Чтение файла
  }
}
