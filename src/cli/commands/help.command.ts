import chalk from 'chalk';
import { Command } from './command.interface.js';
import { CommandType } from './const.js';


export class HelpCommand implements Command {
  public getName(): string {
    return CommandType.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.

        Пример:
            ${chalk.bgCyan('cli.js --<command> [--arguments]')}

        Команды:
            ${chalk.blue('--version')}:                   ${chalk.green('# выводит номер версии')}
            ${chalk.blue('--help')}:                      ${chalk.green('# печатает этот текст')}
            ${chalk.blue('--import')} <path>:             ${chalk.green('# импортирует данные из TSV')}
            ${chalk.blue('--generate')} <n> <path> <url>  ${chalk.green('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
