import { Command } from "./command.interface.js";
import { CommandType } from "./const.js";

export class GenerateCommand implements Command {
  public public getName(): string {
    return CommandType.Generate;
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
  }
}
