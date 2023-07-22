import { ILoggerService } from "../interfaces/ILoggerService.js";
import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";

enum LogLevel {
    Trace = 0,
    Log = 1,
    Debug = 2,
    Info = 3,
    Warning = 4,
    Error = 5,
}

// TODO: define if will be used
export default class LoggerService implements ILoggerService {
    private logFilePath: string;

    public constructor() {
        const rootPath = process.cwd();
        this.logFilePath = path.join(rootPath, "logs.txt");
    }

    private getFormattedMessage(level: LogLevel, message: string) {
        const timestamp = new Date().toISOString();
        const levelKey = LogLevel[level].toUpperCase();
        const logColor = {
            [LogLevel.Trace]: chalk.gray,
            [LogLevel.Log]: chalk.blue,
            [LogLevel.Info]: chalk.green,
            [LogLevel.Warning]: chalk.yellow,
            [LogLevel.Error]: chalk.red,
            [LogLevel.Debug]: chalk.magenta,
        };
        return {
            msgColored: `[${logColor[level](timestamp)}][${logColor[level](levelKey)}] - ${message}`,
            msgUncolored: `[${timestamp}][${levelKey}] - ${message}`,
        };
    }

    private writeLog(level: LogLevel, message: unknown): void {
        const { msgUncolored } =
            message instanceof Error
                ? this.getFormattedMessage(level, message.message)
                : this.getFormattedMessage(level, message as string);
        fs.appendFileSync(this.logFilePath, msgUncolored + "\n", "utf-8");
    }

    trace(message: unknown): void {
        this.writeLog(LogLevel.Trace, message);
    }

    log(message: unknown): void {
        this.writeLog(LogLevel.Log, message);
    }

    debug(message: unknown): void {
        this.writeLog(LogLevel.Debug, message);
    }

    info(message: unknown): void {
        this.writeLog(LogLevel.Info, message);
    }

    warning(message: unknown): void {
        this.writeLog(LogLevel.Warning, message);
    }

    error(message: unknown): void {
        this.writeLog(LogLevel.Error, message);
    }
}
